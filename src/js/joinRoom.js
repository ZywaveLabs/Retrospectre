"use strict";

if (Meteor.isClient) {

    Template.joinRoom.events({

        "submit .join-room": function (eve) {
            eve.preventDefault();
            var room = eve.target.roomCode.value;

            if (room != null && room !== "") {
                Session.set("roomNumber", String(room));
                Router.go("/room/" + String(room));
            } else {
                alert("An invalid room number was given," +
                    "either ask for the number or create a new room.");
            }
        }

    });

}
