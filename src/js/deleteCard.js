"use strict";

/**
<<<<<<< 0514c42e81fbebfc541d89df957e5d0103a08b11
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
=======
 *@author Dustin Chiasson
 *@purpose To provide functionality for removing a card from the room
 **/
>>>>>>> Fixed linting errors

Meteor.methods({
    deleteCard: function(roomNumber, category, text) {
        Mongo.Collection.get("cards").remove({
<<<<<<< 0514c42e81fbebfc541d89df957e5d0103a08b11
        roomCode: roomNumber,
        category: category,
        createdAt: new Date(),
        text: text
    });
  }
});>>>>>>> Created js file for deleteCard
=======
            roomCode: roomNumber,
            category: category,
            createdAt: new Date(),
            text: text
        });
    }
});
>>>>>>> Fixed linting errors
