'use strict'

var express = require('express');
var adminController = require('../controllers/admin.controller');

var api = express.Router();

//Encargados
api.post('/saveManager', adminController.saveManager);
api.get('/getManagers', adminController.getManagers);
api.get('/getManager/:id', adminController.getManager);

//Animales
api.post('/saveAnimal', adminController.saveAnimal);
api.get('/getAnimals', adminController.getAnimals);
api.get('/getAnimal/:id', adminController.getAnimal);


module.exports = api;