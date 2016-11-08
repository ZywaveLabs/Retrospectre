"use strict";
/* global Cards:false Rooms:false UserMethods:false*/
var uniqueIdCount = 0;

Template.cardGrid.onRendered(function(){
    Session.set("getUniqueID_CallCount",uniqueIdCount);
    Session.set("pairSet",false);
});

Template.cardGrid.helpers({
    getCategories: function() {
        return Rooms.findOne(
          {"roomCode": Session.get("roomCode")}
      ).categories;
    },

    cards : function(category) {
        var roomData = Rooms.findOne({"roomCode": Session.get("roomCode")});
        var cards = [];
        var author = UserMethods.getAuthor();
        if(roomData.reveal || Meteor.connection._lastSessionId === roomData.moderator){
            cards = Cards.find({
                "roomCode": Session.get("roomCode"),
                "category": category
            },{sort:{createdAt:-1}});
        } else {
            cards = Cards.find({
                "roomCode": Session.get("roomCode"),
                "category": category,
                $or: [{"reveal": true}, {"author": author}]
            },{sort: {createdAt: -1}});
        }
        return cards;
    },

    getUniqueID: function(category){
        return category.replace(/\s/g, "");
    }
});

Template.cardGrid.events({
    "click div.col-xs-2 span": function(eve){
        var maxWidth = 768;
        if($(window).width() < maxWidth){
            var dataTarget = eve.currentTarget.dataset.target;
            $("div.modal" + dataTarget).modal("toggle");
        }
    }
});
