/* globals Rooms:false RoomMethods:false SnackbarMethods:false Room:false*/
"use strict";

Template.createRoom.onCreated(function() {
    Meteor.call("generateNewRoomCode", function(error, result) {
        if (!error) {
            Session.set("newRoomCode", result);
            Session.set("roomCodeAvailable", true);
        } else {
            SnackbarMethods.DisplayMessage("Error generating new room code, " +
                "please check console for details", 5000, error);
        }
    });
});

Template.createRoom.helpers({

    getNewRoomNumber: function() {
        return Session.get("newRoomCode");
    },

    roomNotAvailableShow: function() {
        return (Session.get("roomCodeAvailable") ? "none" : "");
    },

    createRoomDisable: function() {
        return (Session.get("roomCodeAvailable") ? "" : "disabled");
    }
});

Template.createRoom.events({

    "click #generateNewRoomCodeButton": function() {
        Session.set("newRoomCode", Meteor.call("generateNewRoomCode",
            function(error, result) {
                if (!error) {
                    Session.set("newRoomCode", result);
                    Session.set("roomCodeAvailable", true);
                } else {
                    SnackbarMethods.DisplayMessage(
                        "Error generating room code, " +
                        "please check console for details",
                        5000,
                        error
                    );

                }
            }
        ));
    },

    "submit .create-room": function(eve) {
        eve.preventDefault();
        var roomId = eve.target.roomcode.value;

        if (roomId === null || roomId === "") {
            SnackbarMethods.DisplayMessage("Please enter a room code", 3000);
            return;
        }
        var room = new Room()
                .withRoomCode(roomId)
                .withCategories(["Went Well", "Went Poorly"])
                .createdBy(Session.get("author"))
                .withRevealStatusSetTo(false);

        Meteor.call("createRoom", room, function(){
            Session.set("roomNumber", roomId);
            Router.go("/room/" + roomId);
        });
    },

    "keyup #newRoomCode input": function(eve) {
        var newRoomCode = eve.target.value;
        var show = (newRoomCode !== null && newRoomCode !== "" &&
            !RoomMethods.RoomExists(newRoomCode));

        Session.set("roomCodeAvailable", show);
        Session.set("newRoomCode", eve.target.value);
    }
});
