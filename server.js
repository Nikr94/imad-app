var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleone ={
    title:'Article one template',
    heading:'Article one',
    date:'sep 05,2016',
    content:` <p>
                In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.</p>
        
        <p>server side js.server side js.server side js.server side js.server side js.server side js.v</p>
        <p>server side js.server side js.server side js.server side js.server side js.server side js.server side js.server side js.server side js.server side js.
        </p>`
    
};
function createTemplate(data){
    var title= data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    
var htmltemplate= `
   <html>
       <head>
        <title>${title}</title>
        <meta name="viewport" content="width-device-width, initial-scale-1"/>
       <link href="/ui/style.css" rel="stylesheet">
       </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <h1>${heading}</h1>
        <div>${date}</div>
        ${content}
        </div>
    </body>
</html>`;
return htmltemplate;
}



app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/article-one', function (req, res){
    res.send(createTemplate(articleone));
});

app.get('/article-two', function (req, res){
    res.send("Article-two requested");
});

app.get('/article-three', function (req, res){
    res.send("Article-three requested");
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
