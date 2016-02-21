/* global RoomMethods */
"use strict";

if (Meteor.isClient) {

    Template.landingPage.events({

        "submit .join-room": function (eve) {
            eve.preventDefault();
            // var roomNumber = $("#roomCode:text").val();
            var roomNumber = eve.target.roomCode.value;

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
                var room = eve.target.roomCode.value;

                if(room != null && room !== "" && RoomMethods.RoomExists(room)){
                    Session.set("roomNumber", String(room));
                    Router.go("/room/" + String(room));
                }else{
                    alert("An invalid room number was given," +
                    "either ask for the number or create a new room.");
                }
            }
        }
    });
}
