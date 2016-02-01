"use strict";

/**
 *@author Dustin Chiasson
 *@purpose To provide functionality for removing a card from the room
 **/

Meteor.methods({
    deleteCard: function(roomNumber, category, text) {
        Mongo.Collection.get("cards").remove({
            roomCode: roomNumber,
            category: category,
            createdAt: new Date(),
            text: text
        });
    }
});
