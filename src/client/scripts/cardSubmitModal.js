"use strict";
/* global SnackbarMethods:false Card:false Rooms:false*/

var ModalCategory = function(abbrv,category){
    this.abbrv = abbrv;
    this.category = category;
};

Template.cardSubmitModal.helpers({
    getUniqueID: function(category){
        return new ModalCategory(category.replace(/\s/g, ""),category);
    },

    categories: function() {
        return Rooms.findOne(
            {"roomCode": Session.get("roomNumber")}
        ).categories;
    }
});

Template.cardSubmitModal.events({

    "submit #card": function(eve){
        eve.preventDefault();
        var author = Meteor.user() ?
                        Meteor.user().profile.name :
                        Session.get("author");
        var thought = eve.target.thoughts.value;
        var tags = eve.target.tags.value;

        var category = eve.target.categoryDropdown.value;

        if(category === "Select a Category") {
            SnackbarMethods
                .DisplayMessage("Enter a category for your thought", 3000);
            return ;
        }
        if(thought.length == 0) {
            SnackbarMethods.DisplayMessage("Enter a thought", 3000);
            return ;
        }
        if(!author) {
            SnackbarMethods.DisplayMessage("Please set alias or sign in", 3000);
            return;
        }

        var card = new Card()
                    .inRoom(Session.get("roomNumber"))
                    .withCategory(category)
                    .withText(thought)
                    .createdBy(author);

        if(tags != null && tags != "" && tags != undefined){
            tags = findUniqueTags(tags.split(","));
            card = card.withTags(tags);
        }

        Meteor.call("submitCard", card);

        eve.target.thoughts.value = "";
        eve.target.tags.value = "";
    }
});

/**
*@param {string[] } tags - array of strings describing the tags
*@return {string[] } uniqueTags - array of uniqueTags
**/
function findUniqueTags(tags){
    var uniqueTags = [];
    var count = 0;

    for(var i = 0; i < tags.length; i++){
        tags[i] = tags[i].trim();
        if(tags[i].length !== 0){
            if(i == 0){
                uniqueTags[count] = tags[i];
                count++;
            } else if(uniqueTags.indexOf(tags[i]) == -1){
                uniqueTags[count] = tags[i];
                count++;
            }
        }
        delete tags[i];
    }
    return uniqueTags;
}
