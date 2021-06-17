const {Comment, Pizza} = require('../models');

const commentController = {
    //Add a new comment to pizza
    addComment({params, body}, res){
        Comment.create(body)
        .then(({_id}) => {
            return Pizza.findOneAndUpdate(
                {_id: params.pizzaId},
                {$push: {comments: _id}},
                {new: true}
            );
        })
        .then(dbPizzaData => {
            if(!dbPizzaData){return res.status(404).json({message: 'No pizza found with this id!'})}

            res.json(dbPizzaData);
        })
        .catch(err => res.status(500).json(err));
    },
    //Add a reply to the comment
    addReply({params, body}, res){
        Comment.findOneAndUpdate({_id: params.commentId}, {$push: {replies: body}}, {new: true})
        .then(dbPizzaData => {
            if(!dbPizzaData){return res.status(404).json({message: 'No pizza found with this id!'})}

            res.json(dbPizzaData);
        })
        .catch(err => res.status(500).json(err));
    },
    //Remove a comment
    removeComment({params}, res){
        Comment.findOneAndDelete({_id: params.commentId})
        .then(deletedComment => {
            if(!deletedComment){return res.status(404).json({message: 'No comment found with this id!'})}

            return Pizza.findOneAndUpdate(
                {_id: params.pizzaId},
                {$pull: {comments: params.commentId}},
                {new: true}
            )
        })
        .then(dbPizzaData => {
            if(!dbPizzaData){return res.status(404).json({message: 'No pizza found with this id!'})}

            res.json(dbPizzaData);
        })
        .catch(err => res.status(500).json(err));
    },
    //Remove a reply from a comment
    removeReply({params}, res){
        Comment.findByIdAndUpdate(
            params.commentId, 
            {$pull: {replies: {replyId: params.replyId}}}, 
            {new: true}
        )
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(500).json(err));
    }
};

module.exports = commentController;