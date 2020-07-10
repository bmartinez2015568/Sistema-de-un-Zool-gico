'use strict'

var Manager = require('../models/manager.model');


function login(req, res){
    let params = req.body

    Manager.findOne({email: params.email, password: params.password}, (err, managerLogin)=>{
        if(err){
            res.status(500).send({message:'Error general'});
        }else if(managerLogin){
            res.status(200).send({message:'Ha ingresado correctamente: ', managerLogin})
        }else{
            res.status(404).send({message:'Datos incorrectos'});
        }
    })
}

module.exports = {
    login
}