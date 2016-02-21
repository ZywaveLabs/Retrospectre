
/* global Cards:false */
"use strict";

/**
 *@author Dustin Chiasson
 *@purpose To provide functionality for removing a card from the room
 **/

Meteor.methods({
    submitCard: function (roomNumber, category, text, author, likes, likeBtn) { // eslint-disable-line
        Cards.insert({
            roomCode: roomNumber,
            category: category,
            createdAt: new Date(),
            text: text,
            tags: [],
            likes: likes,
            author: author,
            reveal: false
        });
    },
    submitCardWithTags: function (cardData){
        Cards.insert({
            roomCode: cardData[0],
            category: cardData[1],
            createdAt: new Date(),
            text: cardData[2],
            tags: cardData[3],
            likes: cardData[4],
            author: cardData[5],
            reveal: false
        });
    },
    deleteCard: function(id) {
        Cards.remove(id);
    },
    revealCards: function(roomCode) {
        Cards.update({"roomCode":roomCode},
{$set: {reveal:true}}, {multi: true});
    },
    "removeTag": function(text,oldTags,newTags){
        var cardToUpdate;

        cardToUpdate = Cards.findOne({
            text:text,tags:oldTags
        });
        Cards.update(
       cardToUpdate._id,
       {$set: {tags:newTags}}
     );
    }
});
