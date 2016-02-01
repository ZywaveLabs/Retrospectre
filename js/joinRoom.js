"use strict";

if (Meteor.isClient) {

    Template.joinRoom.events({

        "click #joinRoom": function () {

            var roomNumber = $("#roomCode:text").val();

            roomNumber = parseInt(roomNumber);

            // TODO: I dont think we should limit room codes/numbers to numbers
            // we should eventually let them name the room after their team or whatever
            // they want.  So maybe just check if the room code is in the DB. (later not part of MVP)
            //  --Jake
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
