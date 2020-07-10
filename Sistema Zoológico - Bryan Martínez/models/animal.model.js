'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var animalSchema = Schema({
    name: String,
    type: String,
    age: Number,
    scientificName: String
});

module.exports = mongoose.model('animal', animalSchema);