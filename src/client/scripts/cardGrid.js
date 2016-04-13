"use strict";
/*global Cards:false Rooms:false */

Template.cardGrid.onRendered(function(){
    Session.set("getUniqueID_CallCount",0);
    Session.set("pairSet",false);
});

Template.cardGrid.helpers({

    validMultiRow: function(){
        var categories = Rooms.findOne(
          {"roomCode": Session.get("roomNumber")}
      ).categories;
        var len = categories.length;

        return len > 4;
    },

    getRow: function(){
        var rowOfCategories = [];
        var categories = Rooms.findOne(
          {"roomCode": Session.get("roomNumber")}
      ).categories;
        var index = 0;
        var numInnerArrays = Math.floor(4 / categories.length);

        numInnerArrays += 4 % categories.length;
        /* creates an array of subarray
        *  each subarray holds category
        *  im using this technique to creates
        *  a more bootstrap grid view
        */
        for (var i = 0; i < numInnerArrays; i++) {
            rowOfCategories[i] = new Array();
        }
        for (var j = 0; j < categories.length; index++) {
            for (var k = 0; k < 4 && j < categories.length; k++) {
                rowOfCategories[index][k] = categories[j];
                j++;
            }
        }
        return rowOfCategories;
    },

    getCategories: function() {
        return Rooms.findOne(
          {"roomCode": Session.get("roomNumber")}
      ).categories;
    },

    getNumCategories: function(){
        var cat = Rooms.findOne(
          {"roomCode": Session.get("roomNumber")}
      ).categories;

        return Math.floor(12 / cat.length);
    },

    cards : function(category) {
        var roomData = Rooms.findOne({"roomCode": Session.get("roomNumber")});
        var cards = [];
        var author;

        if(Meteor.user()){
            author = Meteor.user().profile.name;
        } else {
            author = Session.get("author");
        }
        if(roomData.reveal){
            cards = Cards.find({
                "roomCode": Session.get("roomNumber"),
                "category": category
            },{sort:{createdAt:-1}});
        } else {
            cards = Cards.find({
                "roomCode": Session.get("roomNumber"),
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
