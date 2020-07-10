'use strict'

var express = require('express');
var managerController = require('../controllers/manager.controller');

var api = express.Router();

api.post('/login', managerController.login);

module.exports = api;
