var express = require('express')
const path = require('path');

var app = express()

app.use(express.static(path.join(__dirname, '../chris-website/build')));

app.listen(3000)