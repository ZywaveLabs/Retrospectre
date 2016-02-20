/* global RoomMethods */
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
                alert("An invalid room number was given," +
                    "either ask for the number or create a new room.");
            }
        }

    });

}
