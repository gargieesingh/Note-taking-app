const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

//setting up parsers for reading form's raw data/request
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//using css, images, vanilla js for setting up public static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//route setup
app.get('/', function(req, res){
    fs.readdir(`./posts`, function(err, posts){
        res.render("index", {posts : posts});
    })
})

//route for new post 
app.post("/newpost", function(req, res){
    //SOME KNOWLEDGE
//     1. The Browser's Job (Client-Side)
// When you click the <button>Post</button>, because it is inside a <form> element, the browser automatically treats it as a "submit" button. This triggers a sequence of events:

// Find the Form's Instructions: The browser looks at the opening <form> tag to figure out what to do. It finds these two crucial attributes:

// method="post": This tells the browser to create an HTTP POST request. A POST request is designed to send data in its body.

// action="/newpost": This tells the browser where to send the request. It sends it to the /newpost path on your server.

// Gather the Data: The browser scans everything inside the <form> and looks for elements that have a name attribute. In your code, it finds two:

// An <input> with name="title"
// A <textarea> with name="Content".

// Package the Data: It takes the name and the current value (what you typed in) from each of those elements and encodes them into a single string. If you typed "My First Post" in the title and "Hello World" in the content, it would create a string like this:
// title=My+First+Post&Content=Hello+World

// Send the HTTP Request: The browser constructs a complete HTTP POST request.

// Destination: /newpost

// Headers: It adds some metadata, including a very important header: Content-Type: application/x-www-form-urlencoded. This header tells the server what kind of data is in the body.

// Body: It places the data string from the previous step into the body of the request.

// Finally, the browser sends this entire request package over the network to your server running on localhost:3000.

// 2. The Server's Job (Express / Server-Side)
// Your Express server, which is listening for traffic, now receives this request.

// Middleware Steps In: Before the request reaches your specific route handler, it passes through any middleware you've set up with app.use().

// It hits your new line: app.use(express.urlencoded({ extended: true }));

// This middleware's job is to look for incoming requests that have the Content-Type of application/x-www-form-urlencoded. It sees that this request matches!

// The middleware then takes the raw data from the request body (title=My+First+Post&Content=Hello+World), parses it, and turns it into a clean JavaScript object: { title: 'My First Post', Content: 'Hello World' }.

// Populating req.body: The most important job of this middleware is to attach that newly created JavaScript object to the request object. It creates a new property called body on req.

// Routing to Your Code: Express then continues to process the request. It sees it's a POST request for the /newpost path and directs it to the function you wrote:

// JavaScript

// app.post("/newpost", function(req, res){
//     console.log(req.body);
// })
// Execution: By the time your function runs, the express.urlencoded middleware has already done its job. The req object now contains the body property with all your form data neatly organized. When console.log(req.body) is executed, it prints that object to your terminal.
    fs.writeFile(`./posts/${req.body.title.split(' ').join('')}.txt`, req.body.content, function(err){
        if (err) {
            console.error(err);
            res.send("Something went wrong, could not create the file.");
            return;
        }else{
            res.redirect("/");
        }
    })
})

// app.get("/file/:filename", function(req, res){
//     fs.readFile(`./posts/${req.params.filename}`, "utf-8", function(err, filedata){
//         if(err){
//             throw err;
//         }else{
//             res.render('show', {filename: req.params.filename, filedata: filedata});
//         }
//     })
// })

//start the server
app.listen(3000, ()=>{
    console.log("Started the server");
})