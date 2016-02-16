"use strict";

if (Meteor.isClient) {

    Template.joinRoom.events({

        "click #joinRoom": function () {

            var roomNumber = $("#roomCode:text").val();

            roomNumber = parseInt(roomNumber);

            // validate the room number
            if (roomNumber != null && !NaN) {
                Session.set("roomNumber", roomNumber);
                Router.go("/room/" + roomNumber);
            } else {
                alert("An invalid room number was given," +
                    "either ask for the number or create a new room.");
            }
        }

    });

}
