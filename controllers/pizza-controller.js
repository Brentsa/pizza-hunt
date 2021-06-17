const {Pizza} = require('../models');

const pizzaController = {

    //get all the pizzas
    getAllPizza(req, res){
        Pizza.find({}).populate({path: 'comments', select: '-__v'}).select('-__v').sort({_id: -1})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {res.status(400).json(err)});
    },

    //Get one pizza by id
    getPizzaById({params}, res){
        Pizza.findOne({_id: params.id}).populate({path: 'comments', select: '-__v'}).select('-__v')
        .then(dbPizzaData => {
            if(!dbPizzaData){ return res.status(404).json({message: "No pizza found with id!"}) }

            res.json(dbPizzaData);
        })
        .catch(err => {res.status(400).json(err)});
    },

    //Create a pizza
    createPizza({body}, res){
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {res.status(400).json(err)});
    },

    //Update a pizza by ID
    updatePizzaById({params, body}, res){
        Pizza.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbPizzaData => {
            if(!dbPizzaData){ return res.status(404).json({message: "No pizza found with id!"}) }

            res.json(dbPizzaData);
        })
        .catch(err => {res.status(400).json(err)});
    },

    //Delete a pizza by ID
    deletePizzaById({params}, res){
        Pizza.findOneAndDelete({_id: params.id})
        .then(dbPizzaData => {
            if(!dbPizzaData){ return res.status(404).json({message: "No pizza found with id!"}) }

            res.json(dbPizzaData);
        })
        .catch(err => {res.status(400).json(err)});
    }

}

module.exports = pizzaController;