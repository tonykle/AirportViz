'use strict';

let path = require('path');
let express = require('express');
let app = express();

let port = process.env.PORT || 8000;
let indexPath = path.resolve(__dirname, 'client', 'index.html');

app.use(express.static('build'));
app.get('/', function(req, res) {
    res.sendFile(indexPath);
});

app.listen(port, function() {
    console.log('App is live at the URL: ', `localhost:${port}`);
});
