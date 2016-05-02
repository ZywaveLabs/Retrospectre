// /* eslint-disable */
/* global Cards:true CardMethods: true */

// "use strict";

Meteor.methods({

    submitCard: function (cardObject) {
        CardMethods.SubmitCard(cardObject);
    },

    deleteCard: function(id) {
        CardMethods.DeleteCard(id);
    },

    removeTag: function(id,tagToRemove){
        var cardToUpdate;

        cardToUpdate = Cards.findOne({_id:id});

        if(!cardToUpdate) {
            throw new Meteor.Error("update-failed",
            "Couldn't find card to update");
        }
        var tags = cardToUpdate.tags;
        var newTags = [];
        for(var i = 0;i < tags.length;i++){
            if(tags[i] !== tagToRemove)
                newTags.push(tags[i]);
        }
        Cards.update(
            cardToUpdate._id,
            {$set: {tags:newTags}});
    },

    submitComment : function(id,commentToAdd) {
        CardMethods.SubmitComment(id,commentToAdd);
    },
    updateCard: function(id, thought, category, tags){
        CardMethods.Update(id, thought, category, tags);
    }

});
