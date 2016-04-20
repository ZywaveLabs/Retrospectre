/* globals Rooms:false RoomMethods:false SnackbarMethods:false Room:false*/
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
                        5000,
                        error
                    );

                }
            }
        ));
    },

    "submit .create-room, click #createAndJoinRoomButton": function(eve) {
        eve.preventDefault();
        if(!Meteor.user()){
            SnackbarMethods.DisplayMessage("Only a moderator " +
                  "can create a room.", 3000);
            SnackbarMethods.DisplayMessage("Please sign-in using a Google" +
                  " account to become a moderator", 3000);
            return;
        }
        var roomId = Session.get("newRoomCode");

        if (roomId === null || roomId === "") {
            SnackbarMethods.DisplayMessage("Please enter a room code", 3000);
            return;
        }

        var room = new Room()
                .withRoomCode(roomId)
                .withCategories(categories)
                .createdBy(Meteor.user())
                .withRevealStatusSetTo(false);

        Meteor.call("createRoom", room, function(err,result){
            Session.set("roomNumber", roomId);
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

    "keyup #addCategory": function(eve) {
        var customCategory = eve.target.value;

        Session.set("categoryToAdd", customCategory);
    },

    "submit .customCategory": function(eve) {
        eve.preventDefault();
        var customCategory = Session.get("categoryToAdd");

        // prevents dupicates
        for(var i = 0; i < categories.length; i++) {
            if(categories[i].category === customCategory){
                SnackbarMethods.DisplayMessage(
                    "Please enter a unique category", 3000);
                return ;
            }
        }

        if(customCategory != undefined && customCategory.length > 0) {
            // generate a random color for the added category
            var r = Math.floor(Math.random() * (256));
            var g = Math.floor(Math.random() * (256));
            var b = Math.floor(Math.random() * (256));
            var colorValue = "#" + r.toString(16) +
                    g.toString(16) + b.toString(16);

            categories.push({category:Session.get("categoryToAdd"),
                color:colorValue});
            categoriesDep.changed();
            eve.target.addCustomCategory.value = "";
        }

    },

    "click #removeCategory": function(eve) {
        categories.splice(categories.indexOf(this), 1);
        categoriesDep.changed();
    },

    "change #cardBackgroundColor": function(eve) {
        this.color = eve.target.value;
    }
});
