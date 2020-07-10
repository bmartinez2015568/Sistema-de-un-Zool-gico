'use strict'

var Animal = require('../models/animal.model');

function saveAnimal(req, res){
    var animal = new Animal();
    var params = req.body

    if(params.name && params.type && params.age && params.scientificName){
        animal.name = params.name;
        animal.type = params.type;
        animal.age = params.age;
        animal.scientificName = params.scientificName;
        
        animal.save((err, animalSaved)=>{
            if(err){
                res.status(500).send({message:'Error general'});
            }else if(animalSaved){
                res.status(200).send({animal: animalSaved});
            }else{
                res.status(200).send({message:'Error al guardar al animal'});
            }
        })
    }else{
        res.status(200).send({message:'Ingrese los datos necesarios'});

    }


}



function getAnimals(req, res){
    Animal.find({}).exec((err, animals)=>{
        if(err){
            res.status(500).send({message:'Error general'});
        }else if(animals){
            res.status(200).send({animals: animals});
        }else{
            res.status(404).send({message:'No hay registros'});
        }

    })

}



function getAnimal(req, res){
    let animalId = req.params.id;

    Animal.findById(animalId).exec((err, animalFind)=>{
        if(err){
            res.status(500).send({message:'Error general'});
        }else if(animalFind){
            res.status(200).send({animal: animalFind});
        }else{
            res.status(200).send({message: 'No hay registros'});

        }

    })

}



var Manager = require('../models/manager.model');


function saveManager(req, res){
    var manager = new Manager();
    var params = req.body;
    let animal = new Animal();
    var nameA;

    if(params.name && params.lastName && params.charge && params.phone && params.email && params.password && params.animalId){
        Manager.findOne({phone: params.phone}, (err, phoneFind)=>{
            if(err){
                res.status(500).send({message:'Error general'});
            }else if(phoneFind){
                res.status(200).send({message:'El número ya esta en uso'});
            }else{
                manager.name = params.name;
                manager.lastName = params.lastName;
                manager.charge = params.charge;
                manager.phone = params.phone;
                manager.email = params.email;
                manager.password = params.password;

                manager.save((err, ManagerSaved)=>{
                    if(err){
                        res.status(500).send({message:'Error general'});
                    }else if(ManagerSaved){

                        Animal.findById(params.animalId, (err, animalOk)=>{
                            if(err){
                                res.status(500).send({message: 'Error general'});
                            }else if(animalOk){
                                nameA = animal.name
                                //var typeA = animal.type
                                //var ageA = animal.age
                                //var scientificNameA = animal.scientificName
                            }else{
                                res.status(200).send({message:'Error de búsqueda'});
                            }
                        })
                        
                        
                        Manager.findOneAndUpdate({_id: ManagerSaved.id, 'animals._id': params.animalId,}, {"animals.$.name": nameA}, {new:true}, (err, updated)=>{
                            if(err){
                                res.status(500).send({message:'Error general'});
                            }else if(updated){
                                res.status(200).send({update:updated});
                            }else{
                                res.status(200).send({message:'Error al guardar', err});
                            }
                        })
                    }else{
                        res.status(200).send({message: 'No se ha guardado al encargado'});
                    }
                })
            }
        })
    }else{
        res.status(200).send({message: 'Ingrese todos los campos'});
    }
}

function getManagers(req, res){
    Manager.find({}).exec((err, managers)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(managers){
            res.status(200).send({managers: managers});
        }else{
            res.status(404).send({message:"No hay registros"});
        }
    })
}

function getManager(req, res){
    let managerId = req.params.id;
    
    Manager.findById(managerId).exec((err, managerFind)=>{
        if(err){
            res.status(500).send({message:'Error general'});
        }else if(managerFind){
            res.status(200).send({manager: managerFind});
        }else{
            res.status(404).send({message:'No hay registros'});
        }
    })
}



module.exports = {
    saveManager,
    getManagers,
    getManager,
    saveAnimal,
    getAnimals,
    getAnimal
}