const express = require('express');
const app = express();
const path = require('path');

//setting up parsers for reading form's raw data/request
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//using css, images, vanilla js for setting up public static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//route setup
app.get('/', function(req, res){
    res.render("index");
})

//start the server
app.listen(3000, ()=>{
    console.log("Started the server");
})