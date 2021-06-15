//Import schema constructor and model function from mongoose
const {Schema, model} = require('mongoose');

//Define a schema for comments
const commentSchema = new Schema({
    writtenBy:{
        type: String
    },
    commentBody:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

//Create a comment model with the comment schema
const Comment = model('Comment', commentSchema);

//Export the comment model
module.exports = Comment;