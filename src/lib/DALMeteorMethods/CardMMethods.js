// /* eslint-disable */
/* global Cards:true CardMethods: true */

Meteor.methods({
    submitCard: function (cardObject) {
        CardMethods.SubmitCard(cardObject);
    },
    deleteCard: function(id) {
        CardMethods.DeleteCard(id);
    },
    revealCards: function(roomCode) {
        Cards.update({"roomCode":roomCode},
{$set: {reveal:true}}, {multi: true});
    },
    removeTag: function(text,oldTags,newTags,roomCode){
        var cardToUpdate;

        cardToUpdate = Cards.findOne({
            roomCode:roomCode,text:text,tags:oldTags
        });
        if(!cardToUpdate)
            throw new Meteor.Error("update-failed",
            "Couldn't find card to update");
        Cards.update(
       cardToUpdate._id,
       {$set: {tags:newTags}}
     );
    },
    submitComment : function(id,commentToAdd) {
        CardMethods.SubmitComment(id,commentToAdd);
    }
});
