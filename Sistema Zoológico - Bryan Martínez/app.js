'use strict'

var express = require('express');
var bodyParse = require('body-parser');
var adminRoutes = require('./routes/admin.route');
var managerRoutes = require('./routes/manager.route');

var app = express();

app.use(bodyParse.urlencoded({extended:false}));
app.use(bodyParse.json());

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use(('/v1'), adminRoutes);
app.use(('/v1'), managerRoutes);

module.exports = app;