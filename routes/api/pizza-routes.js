const router = require('express').Router();
const {
    getAllPizza, 
    getPizzaById, 
    createPizza, 
    updatePizzaById, 
    deletePizzaById
} = require('../../controllers/pizza-controller');

//Set up GET and POST with /api/pizzas
router
.route('/')
.get(getAllPizza)
.post(createPizza);

//Set up GET, PUT, and DELETE at /api/pizzas/:id
router
.route('/:id')
.get(getPizzaById)
.put(updatePizzaById)
.delete(deletePizzaById);

module.exports = router;