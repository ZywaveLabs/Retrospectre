"use strict";

/**
<<<<<<< 41040f6b048d16203907168769ace34a71a8d1c4
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
=======
*@author Dustin Chiasson
*@purpose To provide functionality for removing a card from the room
**/

Meteor.methods({
    deleteCard: function (roomNumber, category, text) {
        Mongo.Collection.get("cards").remove({
        roomCode: roomNumber,
        category: category,
        createdAt: new Date(),
        text: text
    });
  }
});>>>>>>> Created js file for deleteCard
