/* globals Rooms:false RoomMethods:false SnackbarMethods:false Room:false DEFAULT_SNACKBAR_TIMEOUT:false*/
"use strict";

// default categories
var categories = [{category:"Went Well", color:"#00ff00"},
                {category:"Went Poorly", color:"#ff0000"}];
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

    colorPicker: function(color) {
        return {
            id: "cardBackgroundColor",
            type: "color",
            value: color
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
    },

    "submit .customCategory": function(eve) {
        eve.preventDefault();

        var customCategory = eve.target.addCustomCategory.value;
        if(isDuplicate(customCategory))
            return;
        var nullStr = 0;
        if(customCategory !== undefined && customCategory.length > nullStr) {
            var range = 256;
            var colorValue = genRandomColor(range);

            categories.push({category:customCategory,
                color:colorValue});
            categoriesDep.changed();
            eve.target.addCustomCategory.value = "";
        }

    },

    "click #removeCategory": function() {
        var numToRemove = 1;
        categories.splice(categories.indexOf(this), numToRemove);
        categoriesDep.changed();
    },

    "change #cardBackgroundColor": function(eve) {
        this.color = eve.target.value;
    }
});

function genRandomColor(range){
    var r = Math.floor(Math.random() * (range));
    var g = Math.floor(Math.random() * (range));
    var b = Math.floor(Math.random() * (range));
    var base = 16;// prints to hex
    return "#" + r.toString(base) +
            g.toString(base) + b.toString(base);
}

function isDuplicate(customCategory){
    for(var i = 0; i < categories.length; i++) {
        if(categories[i].category === customCategory){
            SnackbarMethods.DisplayMessage(
                "Please enter a unique category", DEFAULT_SNACKBAR_TIMEOUT);
            return true;
        }
    }
    return false;
}
