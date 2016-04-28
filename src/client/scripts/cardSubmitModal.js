"use strict";
/* global SnackbarMethods:false Card:false Rooms:false s:false DEFAULT_SNACKBAR_TIMEOUT:false*/

var ModalCategory = function(abbrv,category){
    this.abbrv = abbrv;
    this.category = category;
};

var MinThoughtLength = 0;
Template.cardSubmitModal.helpers({
    getUniqueID: function(category){
        return new ModalCategory(category.replace(/\s/g, ""),category);
    },

    categories: function() {
        return Rooms.findOne(
            {"roomCode": Session.get("roomCode")}
        ).categories;
    }
});

Template.cardSubmitModal.events({

    "submit #card": function(eve){
        eve.preventDefault();
        var cardData = getCardData(eve);
        var tags = eve.target.tags.value;
        var init = 0;

        var card = new Card()
                    .inRoom(Session.get("roomCode"))
                    .withCategory(cardData[init])
                    .withText(cardData[init++])
                    .createdBy(cardData[init++]);

        if(tags != null && tags !== "" && tags !== undefined){
            card = card.withTags(findUniqueTags(tags.split(",")));
        }

        Meteor.call("submitCard", card);

        eve.target.thoughts.value = "";
        eve.target.tags.value = "";
    }
});

function getCardData(eve){
    var author = Meteor.user() ?
                    Meteor.user().profile.name :
                    Session.get("author");
    var thought = eve.target.thoughts.value;
    var category = eve.target.categoryDropdown.value;
    if(completeCard(category,thought,author))
        return [category,thought,author];
}

function completeCard(category,thought,author){
    if(category === "Select a Category") {
        SnackbarMethods
            .DisplayMessage("Enter a category for your thought", DEFAULT_SNACKBAR_TIMEOUT);
        return false;
    }
    if(thought.length === MinThoughtLength) {
        SnackbarMethods.DisplayMessage("Enter a thought",  DEFAULT_SNACKBAR_TIMEOUT);
        return false;
    }
    if(!author) {
        SnackbarMethods.DisplayMessage("Please set alias or sign in",  DEFAULT_SNACKBAR_TIMEOUT);
        return false;
    }
    return true;
}
/**
*@param {string[] } tags - array of strings describing the tags
*@return {string[] } uniqueTags - array of uniqueTags
**/
function findUniqueTags(tags){
    var tagSet = new Set();

    tags.forEach(v => tagSet.add(s(v).clean().titleize().value()));
    tagSet.delete(""); // Delete Empty tags from submission
    return Array.from(tagSet);
}
