"use strict";

/**
 *@author Dustin Chiasson
 *@purpose To provide functionality for removing a card from the room
 **/

Meteor.methods({
    submitCard: function (roomNumber, category, text, author) {
        Mongo.Collection.get("cards").insert({
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
        Mongo.Collection.get("cards").insert({
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
        Mongo.Collection.get("cards").remove(id);
    },
    revealCards: function(roomCode) {
        Mongo.Collection.get("cards").update({"roomCode":roomCode},
{$set: {reveal:true}}, {multi: true});
    },
    "removeTag": function(text,oldTags,newTags){
        var cardToUpdate;

        cardToUpdate = Meteor.Collection.get("cards").findOne({
            text:text,tags:oldTags
        });
        Mongo.Collection.get("cards").update(
       cardToUpdate._id,
       {$set: {tags:newTags}}
     );
    }
});
