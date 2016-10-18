"use strict";
/* global Cards:false Rooms:false*/
/**
* @purpose To provide the room template with data to display
**/

Template.room.onCreated(function () {
    Meteor.autorun(function() {
        Meteor.subscribe("cards", Session.get("roomCode"));
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
        var author;

        if(Meteor.user()){
            author = Meteor.user().profile.name;
        } else {
            author = Session.get("author");
        }
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

    isModerator: function(){
        var room = Rooms.findOne({"roomCode": Session.get("roomCode")});
        return room.owner === Meteor.userId();
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

    "click .tag": function(e){
        e.stopPropagation();
        //add to filter?
    },

    "click #exportButton": function() {
        var roomCode = Session.get("roomCode");

        Router.go("/room/" + roomCode + "/export");
    }
});
