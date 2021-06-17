//Import schema constructor and model function from mongoose
const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//Define a schema for replies
const ReplySchema = new Schema(
    {
        //set custom id to avoid confusion with parent id
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        replyBody: String,
        writtenBy: String,
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdVal => dateFormat(createdVal)
        }
    },
    {
        toJSON: { getters: true }
    }
);

//Define a schema for comments
const CommentSchema = new Schema(
    {
        writtenBy: String,
        commentBody: String,
        //Use the reply schema to validate data for replies
        replies: [ReplySchema],
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdVal => dateFormat(createdVal)
        }
    },
    {
        toJSON: { virtuals: true, getters: true },
        id: false
    }
);

CommentSchema.virtual('replyCount').get(function(){
    return this.replies.length;
});

//Create a comment model with the comment schema
const Comment = model('Comment', CommentSchema);

//Export the comment model
module.exports = Comment;