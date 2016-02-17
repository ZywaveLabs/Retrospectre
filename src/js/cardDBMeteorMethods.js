"use strict";

/**
 *@author Dustin Chiasson
 *@purpose To provide functionality for removing a card from the room
 **/

Meteor.methods({
    submitCard: function (roomNumber, category, text, author) {
        Cards.insert({
            roomCode: roomNumber,
            category: category,
            createdAt: new Date(),
            text: text,
            tags: [],
            author: author,
            reveal: false
        });
    },
    submitCardWithTags: function (roomNumber, category, text, tags, author){
        Cards.insert({
            roomCode: roomNumber,
            category: category,
            createdAt: new Date(),
            text: text,
            tags: tags,
            author: author,
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

        cardToUpdate = Meteor.Collection.get("cards").findOne({
            text:text,tags:oldTags
        });
        Cards.update(
       cardToUpdate._id,
       {$set: {tags:newTags}}
     );
    }
});
