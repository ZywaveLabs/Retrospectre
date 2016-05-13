"use strict";
/* global Cards:false Rooms:false*/
/**
*@purpose To provide the room template with data to display
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
    //TODO have this call another mentod
    cards : function(category) {
        var roomData = Rooms.findOne({"roomCode": Session.get("roomCode")});
        var cards = [];
        var author;

        if(Meteor.user()){
            author = Meteor.user().profile.name;
        } else {
            author = Session.get("author");
        }
        if(roomData.reveal){
            cards = Cards.find({
                "roomCode": Session.get("roomCode"),
                "category": category
            });
        } else {
            cards = Cards.find({
                "roomCode": Session.get("roomCode"),
                "category": category,
                $or: [{"reveal": true}, {"author": author}]
            },{sort: {createdAt: -1}});
        }

        return cards;
    },

    isModerator: function(){
        var room = Rooms.findOne({"roomCode": Session.get("roomCode")});

        return room.owner === Meteor.userId();
    }
});

Template.room.events({
    "click #revealCardButton": function(){
        Meteor.call("revealCards", Session.get("roomCode"));
    },

    "click tag": function(e){
        e.stopPropagation();
        filterSingleTag(e.toElement.innerHTML);
    },

    "submit #tagSearchForm": function(e){
        e.preventDefault();
        var tags = e.target.filters.value.split(",");

        tags = tags.map(function(element){
            return element.toLowerCase().trim();
        });
        filterMultipleTags(tags);
    },

    "click #clearFilter": function(){
        clearFilter();
        $("#filters").val("");
    },

    "click #exportButton": function() {
        var roomCode = Session.get("roomCode");

        Router.go("/room/" + roomCode + "/export");
    }
});

/**
*@param {string} tag - tag to filter cards by
*Filters cards by the tag given
**/
function filterSingleTag(tag){
    filterMultipleTags([tag]);
    $("#filters").val(tag);
}

/**
*@param {string[]} tags - Array of strings containing tags to filter by
*Filters displayed cards by tags
**/
function filterMultipleTags(tags){
    var numCards = $(".card-panel").length;
    var indexFound = 0;
    for(var i = 0; i < numCards;i++){
        var compTags;
        var found;

        found = false;
        compTags = $(".card-panel").eq(i).find(".tag");
        for(var j = 0; j < compTags.length; j++){
            if(tags.indexOf(compTags[j].innerHTML) >= indexFound)
                found = true;
        }
        if(!found)
            $(".card-panel").eq(i).hide();
        else if (found)
            $(".card-panel").eq(i).show();
    }
}

/**
*Clears filters field and show all cards
**/
function clearFilter(){
    $("#filters").val("");
    $(".card-panel").show();
}
