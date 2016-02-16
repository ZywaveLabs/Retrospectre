"use strict";

if (Meteor.isClient) {

    Template.landingPage.events({

        "submit .join-room": function (eve) {
            eve.preventDefault();
            // var roomNumber = $("#roomCode:text").val();
            var roomNumber = eve.target.roomCode.value;

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
