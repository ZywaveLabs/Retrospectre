"use strict";
/* global SnackbarMethods:false Card:false Rooms:false s:false*/

Template.cardSubmitArea.helpers({
    categories: function() {
        return Rooms.findOne(
            {"roomCode": Session.get("roomNumber")}
        ).categories;
    }
});

Template.cardSubmitArea.events({

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
    var tagSet = new Set();

    tags.forEach(v => tagSet.add(s(v).clean().titleize().value()));
    tagSet.delete(""); // Delete Empty tags from submission
    return Array.from(tagSet);
}
