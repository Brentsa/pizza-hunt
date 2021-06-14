//Import Schema constructor and model function from Mongoose library
const {Schema, model} = require('mongoose');

//Create the schema used to store pizza documents
const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

//Create the pizza model using the pizza schema
const Pizza = model('Pizza', PizzaSchema);

//Export the pizza model
module.exports = Pizza;