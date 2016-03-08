/* global RoomMethods SnackbarMethods*/
"use strict";

if (Meteor.isClient) {

    Template.landingPage.events({

        "submit .join-room": function (eve) {
            eve.preventDefault();
            var room = eve.target.roomCode.value;

            if(room != null && room !== "" && RoomMethods.RoomExists(room)){
                Session.set("roomNumber", String(room));
                Router.go("/room/" + String(room));
            }else{
                SnackbarMethods.DisplayMessage("An invalid room number was " +
                "given, either ask for the room code or create a new room.",
                5000);
            }
        }
    });
}
