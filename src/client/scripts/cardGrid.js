"use strict";
/* global Cards:false Rooms:false CardsSearchableFieldMap: true getMongoQueryObjectFromSearch: true*/
const MAX_COL_PER_ROW = 4;
var uniqueIdCount = 0;

Template.cardGrid.onRendered(function(){
    Session.set("getUniqueID_CallCount",uniqueIdCount);
    Session.set("pairSet",false);
});

Template.cardGrid.onCreated(function() {
    var cards = Cards.find({
        "roomCode": Session.get("roomCode")
    }, {sort: {createdAt:-1}});
    Session.set("searchKeyMapping", CardsSearchableFieldMap);
});

Template.cardGrid.helpers({
    getCategories: function() {
        return Rooms.findOne(
          {"roomCode": Session.get("roomCode")}
      ).categories;
    },

    cards : function(category) {
        var roomData = Rooms.findOne({"roomCode": Session.get("roomCode")});
        var author;

        if(Meteor.user()){
            author = Meteor.user().profile.name;
        } else {
            author = Session.get("author");
        }

        var searchQuery = getMongoQueryObjectFromSearch(CardsSearchableFieldMap);
        var revealQuery = roomData.reveal ? [{}] : [{"reveal": true}, {"author": author}];

        var baseQuery = {
            "category": category,
            $and:searchQuery,
            $or: revealQuery
        };

        return Cards.find(baseQuery, {sort: {createdAt:-1}}).fetch();
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
