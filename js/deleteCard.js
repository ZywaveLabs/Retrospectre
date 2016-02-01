"use strict";

/**
 *@author Dustin Chiasson
 *@purpose To provide functionality for removing a card from the room
 **/
Meteor.methods({
    deleteCard: function(id) {
        Mongo.Collection.get("cards").remove(id);
    }
});
