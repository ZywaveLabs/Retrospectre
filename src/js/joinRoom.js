"use strict";

if (Meteor.isClient) {

    Template.landingPage.events({

        "submit .join-room": function (eve) {
            eve.preventDefault();
            var roomNumber = eve.target.roomCode.value;

            if (roomNumber != null && !NaN) {
                Session.set("roomNumber", String(roomNumber));
                Router.go("/room/" + roomNumber);
            } else {
                alert("An invalid room number was given," +
                    "either ask for the number or create a new room.");
            }
        }

    });

}
