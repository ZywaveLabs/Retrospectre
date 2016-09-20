
// /* eslint-disable */
/* global Cards:true CardMethods: true RoomMethods: true */

// "use strict";

Meteor.methods({

    submitCard: function (cardObject) {
        CardMethods.SubmitCard(cardObject);
    },

    deleteCard: function(cardId, roomCode, author) {
        var isModerator = RoomMethods.IsModerator(roomCode, Meteor.userId());
        var cardAuthor = Cards.findOne({_id:cardId}).author;
        var currUser = Meteor.user() ? Meteor.user().profile.name : author;

        if(isModerator || cardAuthor === currUser)
            CardMethods.DeleteCard(cardId);
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
    },
    incrementLikes: function(id){
        CardMethods.IncrementLikes(id);
    }
});
