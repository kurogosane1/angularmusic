// Dependencies
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 3600;
const api = require('./server/Routes/routes');





// The code below is pretty standard.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// app.use(express.static(process.cwd() + "/dist"));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'))
})


// requiring the routes to function with the server
app.use('', api);

// To listen the port
app.listen(PORT, function(){
    console.log("listening at port:"+ PORT);
});



