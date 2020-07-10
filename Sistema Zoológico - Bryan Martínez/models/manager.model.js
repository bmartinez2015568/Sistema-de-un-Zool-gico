'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ManagerSchema = Schema({
    name: String,
    lastName: String,
    charge: String,
    phone: String,
    email: String,
    password: String,
    animalInCharge: [{
        name: String,
        type: String,
        age: Number,
        scientificName: String
    }]
});

module.exports = mongoose.model('Manager', ManagerSchema);