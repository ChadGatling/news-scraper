var express = require("express");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var request = require("request");
var path = require("path");
var apiRoutes = require("./routes/api-routes.js");
var htmlRoutes = require("./routes/html-routes.js");

var app = express();
const PORT = 3000;


var databaseUrl = "newsScraper";
var collections = ["articles"];

var db = mongojs(databaseUrl, collections);
db.on("error", (error) => {
    console.log(`Database error: ${error}`)
})

apiRoutes(app, db, request, cheerio);
htmlRoutes(app, db, request, cheerio, path);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
});