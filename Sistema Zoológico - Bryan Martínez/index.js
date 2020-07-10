'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/SistemaZoologico2015568', {useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>{
        console.log('Conexion a la base de datos correcta');
        app.listen(port, ()=>{
            console.log('El servidor express esta corriendo en el puerto: ', port);
    })
})
    .catch(err=>{
        console.log('Error al conectarse a la base de datos: ',err);
    })