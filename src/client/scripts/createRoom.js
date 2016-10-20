/* globals Rooms:false RoomMethods:false SnackbarMethods:false Room:false DEFAULT_SNACKBAR_TIMEOUT:false*/
"use strict";

// default categories
var categories = [{category:"Went Well", color:"#81c784"},
                {category:"Went Poorly", color:"#f44336"},
              {category:"Kudoz", color:"#2196f3"}];
var categoriesDep = new Tracker.Dependency();


Template.createRoom.onCreated(function() {
    this.subscribe("rooms");
    Meteor.call("generateNewRoomCode", function(error, result) {
        if (!error) {
            Session.set("newRoomCode", result);
            Session.set("roomCodeAvailable", true);
        } else {
            SnackbarMethods.DisplayMessage("Error generating new room code, " +
                "please check console for details", DEFAULT_SNACKBAR_TIMEOUT, error);
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
    },
    getCategories: function() {
        categoriesDep.depend();
        return categories;
    },
    getTracker: function() {
        return categoriesDep;
    },

    onCategoryCreated: function() {
        return function(currentCategories, categoryName, color) {
            return true;
        };
    },
    onCategoryRemoved: function() {
        return function(currentCategories, categoryName, allowUpdate) {
            allowUpdate(true);
        };
    },
    onColorChanged: function() {
        return function(currentCategories, categoryName, newColor){
            return true;
        };
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
                        DEFAULT_SNACKBAR_TIMEOUT,
                        error
                    );

                }
            }
        ));
    },
    "click #createAndJoinRoomButton": function(eve) {
        eve.preventDefault();

        if(!Meteor.user()){
            SnackbarMethods.DisplayMessage("Only a moderator can create a room." +
                  " Please sign-in", DEFAULT_SNACKBAR_TIMEOUT);
            return;
        }
        var roomId = Session.get("newRoomCode");

        if (roomId === null || roomId === "") {
            SnackbarMethods.DisplayMessage("Please enter a room code", DEFAULT_SNACKBAR_TIMEOUT);
            return;
        }

        var room = new Room()
                .withRoomCode(roomId)
                .withCategories(categories)
                .withRevealStatusSetTo(false)
                .createdBy(Meteor.userId());

        Meteor.call("createRoom", room, function(err,result){
            Session.set("roomCode", roomId);
            Router.go("/room/" + roomId);
            if(!err)
                Session.set("docId",result);
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
