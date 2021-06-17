//Import Schema constructor and model function from Mongoose library
const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//Create the schema used to store pizza documents
const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String,
            required: 'You must provide a pizza name.',
            trim: true
        },
        createdBy: {
            type: String,
            required: 'You must provide your name.',
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            required: true,
            enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
            default: 'Large'
        },
        toppings: [],
        comments:[
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//Get a total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function(){
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

//Create the pizza model using the pizza schema
const Pizza = model('Pizza', PizzaSchema);

//Export the pizza model
module.exports = Pizza;