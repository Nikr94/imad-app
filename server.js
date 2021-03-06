var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user:'nrg051194',
    database : 'nrg051194',
    host : 'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
    
};

var app = express();
app.use(morgan('combined'));

var articles={
 'article-one': {
    title:'Article one template',
    heading:'Article one',
    date:'sep 05,2016',
    content:` <p>
                In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.</p>
        
        <p>server side js.server side js.server side js.server side js.server side js.server side js.v</p>
        <p>server side js.server side js.server side js.server side js.server side js.server side js.server side js.server side js.server side js.server side js.
        </p>`
    
                 },
 'article-two': {
      title:'Article two template',
    heading:'Article two',
    date:'sep 10,2016',
    content:` <p>
                In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.</p>
        
        `
 },
 'article-three': {
      title:'Article three template',
    heading:'Article three',
    date:'sep 15,2016',
    content:` <p>
                In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.In this we are going to learn about server side js.</p>`
 }
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
        <div>${date.toDateString()}</div>
        ${content}
        </div>
    </body>
</html>`;
return htmltemplate;
}

var counter =0;
app.get("/counter", function (req, res) {
  counter = counter + 1;
  res.send(counter.toString());
});

var pool = new Pool(config);
app.get('/test-db',function (req, res){
    pool.query('SELECT * FROM test', function(err, result){
        if(err){
            res.status(500).send(err.toString());
            }else{
                res.send(JSON.stringify(result.rows));
            }
    });
    
});
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

var names=[];
app.get('/submit-name',function(req, res){
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
    
});
app.get('/articles/:articleName', function (req, res){
  // var  articleName = req.params.articleName;
  //  res.send(createTemplate(articles[articleName]));
    pool.query("SELECT * FROM article WHERE title = $1",[req.params.articleName],function(err,result){
    if(err){
         res.status(500).send(err.toString());
            }else{
            if(result.rows.length === 0){
                res.status(404).send("Article not found");
            }else{
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
          }
            }
            }); 
});




// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
