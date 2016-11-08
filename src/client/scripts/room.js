"use strict";
/* global Cards:false Rooms:false UserMethods:false*/
/**
*@purpose To provide the room template with data to display
**/

var isModReactiveVarHelper;

// isUserModeratorOfRoom = function() {
//     return isModReactiveVarHelper.get();
// }

Template.room.onCreated(function () {
    Meteor.autorun(function() {
        Meteor.subscribe("cards", Session.get("roomCode"));
    });

    // A reactive var is for isModerator variable so the server can validate
    // the moderator and and have the clients update appropriately
    this.isUserRoomModerator = new ReactiveVar();
    this.isUserRoomModerator.set(false);
    isModReactiveVarHelper = this.isUserRoomModerator;

    Meteor.call("isModerator", Session.get("roomCode"), function(error, response){
        isModReactiveVarHelper.set(response);
    });
});


Template.room.helpers({

    getCategories: function() {
        return Rooms.findOne(
            {"roomCode": Session.get("roomCode")}
        ).categories;
    },

    cards : function(category) {
        var roomData = Rooms.findOne({"roomCode": Session.get("roomCode")});
        var cards = [];
        var author = UserMethods.getAuthor();
        if(roomData.reveal || roomData.ower === Meteor.userId()){
            cards = Cards.find({
                "roomCode": Session.get("roomCode"),
                "category": category
            });
        } else {
            cards = Cards.find({
                "roomCode": Session.get("roomCode"),
                "category": category,
                $or: [{"reveal": true}, {"author": author}]
            },{sort: {createdAt: 0}});
        }

        return cards;
    },

    isModerator: function() {
        return Template.instance().isUserRoomModerator.get();
    },

    displayClaimModeratorButton: function() {
        return Rooms.findOne({"roomCode": Session.get("roomCode")}).moderator === "";
    },

    cardsHidden: function(){
        var room = Rooms.findOne({"roomCode": Session.get("roomCode")});
        return !room.reveal;
    }
});

Template.room.events({
    "click #revealCardButton": function(){
        Meteor.call("revealCards", Session.get("roomCode"));
    },

    "click #hideCardButton": function(){
        Meteor.call("hideCards", Session.get("roomCode"));
    },

    "click #claimModeratorButton": function() {
        Meteor.call("claimModerator", Session.get("roomCode"), function(error, result) {
            if(!error) {
                isModReactiveVarHelper.set(result);
            }
        });
    },

    "click #exportButton": function() {
        var roomCode = Session.get("roomCode");

        Router.go("/room/" + roomCode + "/export");
    }
});
