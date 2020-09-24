// import header from 'views/header.js';
const express = require("express");
const bodyParser =  require("body-parser");

const app = express(); 

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("views/static"));

app.get("/", function(req, res){
    res.render('index');
});



app.listen(3000, function(){
    console.log("Server running at port 3000");
});

//
//