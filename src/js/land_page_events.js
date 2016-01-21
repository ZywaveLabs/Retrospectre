"use strict";

if(Meteor.isClient){
    Template.landingPage.events({
        "click #createRoomButton": function () {
            Router.go("Create Room");
        },
        "click #joinRoom": function(){
            var roomNumber = prompt("Enter the designated room number.");

            roomNumber = parseInt(roomNumber);
            if(roomNumber != null && !NaN)
                Router.go("/room",{_id:roomNumber},{});
            else
                alert("An invalid room number was given, either ask for the" +
                    "number or create a new room.");
        }
    });
}