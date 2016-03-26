"use strict";
/* global Cards:false Rooms:false*/
/**
*@author THouse
*@purpose To provide the room template with data to display
**/

Template.room.onCreated(function () {
    this.subscribe("cards");
});

Template.room.helpers({
    getCategories: function() {
        return Rooms.findOne(
            {"roomCode": Session.get("roomNumber")}
        ).categories;
    },

    cards : function(category) {
        var roomData = Rooms.findOne({"roomCode": Session.get("roomNumber")});
        var cards = [];

        if(roomData.reveal){
            cards = Cards.find({
                "roomCode": Session.get("roomNumber"),
                "category": category
            });
        } else {
            cards = Cards.find({
                "roomCode": Session.get("roomNumber"),
                "category": category,
                // TODO: $or: [{roomData.reveal}, {"reveal": true}, {"author": Session.get("author")}]
                // Will that work?
                $or: [{"reveal": true}, {"author": Session.get("author")}]
            });
        }

        return cards;
    }
});

Template.room.events({
    "click #revealCardButton": function(){
        Meteor.call("revealCards", Session.get("roomNumber"));
    },

    "click #deleteCardButton": function(){
        Meteor.call("deleteCard",this._id);
    },

    "click #filterTagsButton": function(event){// eslint-disable-line
        var tags = event.target.form[0].value.split(",");

        for(var i = 0; i < tags.length; i++){
            tags[i] = tags[i].toLowerCase();
        }

        filterMultipleTags(tags);
    },

    "click tag": function(e){
        filterSingleTag(e.toElement.innerHTML);
    },

    "submit #tagSearchForm": function(e){
        e.preventDefault();
        var tags = e.target.filters.value.split(",");

        for(var i = 0; i < tags.length; i++){
            tags[i] = tags[i].toLowerCase();
        }

        filterMultipleTags(tags);
        e.target.filters.value = "";
    },

    "click #removeTag": function(e){
        var tags;
        var prevEleTag;
        var text;

        prevEleTag = e.target.previousElementSibling.innerHTML;
        prevEleTag = prevEleTag.toLowerCase();
        tags = $(e.toElement.parentNode.parentNode).find(".tag");
        text = $(e.toElement.parentNode.parentNode.previousElementSibling);
        text = text[0].innerText;
        var newTags;
        var oldTags;

        newTags = [];
        oldTags = [];
        var count;

        count = 0;
        for(var j = 0; j < tags.length; j++){
            oldTags[j] = tags[j].innerHTML;
        }
        for(var i = 0; i < oldTags.length; i++){
            if(oldTags[i].toLowerCase() != prevEleTag){
                newTags[count] = oldTags[i].toLowerCase();
                count++;
            }
        }
        Meteor.call("removeTag",text,oldTags,
          newTags,Session.get("roomNumber"));
    },

    "click #clearFilter": function(){
        clearFilter();
        $("#filters").val("");
    },

    "click #likeButton": function(eve){
        //TODO FIX THIS SHIT!
        if(eve.target.id === "likeButton") {
            eve.target.disabled = true;
        } else if(eve.target.parentNode.id === "likeButton") {
            eve.target.parentNode.disabled = true;
        }

        Cards.update({ _id: this._id}, { $inc: {likes: 1} });
    }
});

/**
*@param {string} tag - tag to filter cards by
*Filters cards by the tag given
**/
function filterSingleTag(tag){
    tag = tag.toLowerCase();
    $("#filters").val(tag);
    var numCards;

    numCards = $(".card-panel").length;
    for(var i = 0; i < numCards;i++){
        var compTags;
        var found;

        found = false;
        compTags = $(".card-panel").eq(i).find(".tag");
        for(var j = 0; j < compTags.length; j++){
            if(compTags[j].innerHTML.toLowerCase().indexOf(tag) >= 0)
                found = true;
        }
        if(!found)
            $(".card-panel").eq(i).hide();
        else if (found)
            $(".card-panel").eq(i).show();
    }
}

/**
*@param {string[]} tags - Array of strings containing tags to filter by
*Filters displayed cards by tags
**/
function filterMultipleTags(tags){
    var numCards;

    numCards = $(".card-panel").length;
    for(var i = 0; i < numCards;i++){
        var compTags;
        var found;

        found = false;
        compTags = $(".card-panel").eq(i).find(".tag");
        for(var j = 0; j < compTags.length; j++){
            if(tags.indexOf(compTags[j].innerHTML) >= 0)
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
    var numCards;

    numCards = $(".card-panel").length;
    for(var i = 0; i < numCards;i++){
        $(".card-panel").eq(i).show();
    }
}
