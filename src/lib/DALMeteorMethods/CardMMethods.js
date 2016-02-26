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
          console.log("error find the right card to udate, sorry try again later");//eslint-disable-line
        Cards.update(
       cardToUpdate._id,
       {$set: {tags:newTags}}
     );
    }
});
