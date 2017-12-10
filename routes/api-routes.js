module.exports = (app, db, request, cheerio) => {
    app.get("/api/all", (req, res) => { // get the articles data
    	db.articles.find({}, (error, found) => {
    		res.json(found.map((item) => item.title));
    	})
    });

    app.get("/api/scrape", (req, res) => { // scrape and send to database
    	request("https://www.wsj.com/", (error, response, html) => {
    		var $ = cheerio.load(html);

    		var count = 0;
			var data = [];

			db.articles.find({}, (error, found) => { // get articles from database
				if (error) throw error;
				else {

					data = found.map((item) => item.title);
					console.log(data);

					$("a.wsj-headline-link").each((index, element) => { // on each html element
		    			count++;

		    			var title = $(element).text();
		    			if (!data.includes(title)) {

			    			db.articles.insert({
			    				title: title
			    			}, (error, inserted) => {
			    				if (error) throw error;
			    			});
			    		}
			    		else {
			    			console.log(`${title} was skipped.`)
			    		}
		    		});  
	    		}
    			res.send(data)				
			});
    	});
    });

    app.get("/api/clear", (req, res) => { // clear the database
    	db.articles.remove({}, (error) => {
    		res.send("Database cleared.")
    	})
    });
};