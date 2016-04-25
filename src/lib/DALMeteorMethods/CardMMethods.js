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

    removeTag: function(text,oldTags,newTags,roomCode){
        var cardToUpdate;

        cardToUpdate = Cards.findOne({
            roomCode:roomCode,text:text,tags:oldTags
        });

        if(!cardToUpdate) {
            throw new Meteor.Error("update-failed",
            "Couldn't find card to update");
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
