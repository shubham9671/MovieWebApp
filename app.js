var express = require("express");
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public')); //serve(expr) the content of the public dir

app.get("/home", function(req, res){
    var data = []; //empty array
    res.render("home", {data: data});
});

app.get('/', (req, res) => {
    res.render('login');
   });
app.post('/login',function(req, res){
 var userName = req.body.username
 var password = req.body.password

 if(userName && password){
    var data = []; //empty array
    res.render("home", {data: data})
 }
 else{
    res.render("notfound", {userQuery: null})
 }


})
//route for the search
app.post("/search", function(req, res){
    var userQuery = req.body.searchedQuery;
    request('https://www.omdbapi.com/?s=' + userQuery + '&type=movie&apikey=thewdb', function (error, response, body) {
        if(error) console.log('StatusCode:', response && response.statusCode,'\nError:', error); // Print the error and the response status code if a response was received
        else { 
            var data = JSON.parse(body).Search;
            if(JSON.parse(body).totalResults) {
                res.render("home", {data: data});
            }
            else { //if there are no results
                res.render("notfound", {userQuery: userQuery});
            }
        }
    });
});

app.get("*", function(req, res){
    res.render("404");
});



var port = process.env.PORT || 8080;

app.listen(port, function(){
    console.log('Movie started on https://localhost:' + port); 
});
