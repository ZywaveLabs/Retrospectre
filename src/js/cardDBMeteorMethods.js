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
            author: author,
            reveal: false
        });
    },

    deleteCard: function(id) {
        Cards.remove(id);
    },

    revealCards: function(roomCode) {
    	Cards.update({"roomCode":roomCode}, {$set: {reveal:true}}, {multi: true});
    }
});

