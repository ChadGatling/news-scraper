module.exports = (app,db,request,cheerio, path) => {
	app.get("/", (req, res) => {
		res.sendFile(path.join(__dirname, "/../public/html/index.html"));
	});
};