const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();
app.listen(port, (res)=>{console.log("Server Started.")})

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err=>{if(err)console.log("Not able to append")});
  next();
});
// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
//   //next();
// });
app.use(express.static(__dirname + '/public'));
app.get('/', (request, response)=>{
  response.render('home.hbs',{
    pageTitle: "Home Page",
    name: 'world!',
    currentYear: new Date().getFullYear()
  });
});

app.get('/about', (request, response)=>{
  response.render('about.hbs',{
    pageTitle: "About Page",
    currentYear: new Date().getFullYear()
  });
});

app.get('/error', (request, response)=>{
  response.send({
    status: false,
    responseMessage: "Bad request :("
  });
});