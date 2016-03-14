"use strict";
/* global SnackbarMethods:false Card:false Rooms:false*/

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

        var author = eve.target.author.value;
        var thought = eve.target.thoughts.value;
        var tags = eve.target.tags.value;

        var category = undefined;

        if(eve.target.categoryDropdown.value === "Went Well") {
            category = "Went Well";
        } else if(eve.target.categoryDropdown.value === "Went Poorly") {
            category = "Went Poorly";
        } else {
            SnackbarMethods
                .DisplayMessage("Enter a category for your thought", 3000);
            return ;
        }
        if(thought.length == 0) {
            SnackbarMethods.DisplayMessage("Enter a thought", 3000);
            return ;
        }
        if(author.length == 0) {
            SnackbarMethods.DisplayMessage("Whose thought is this?", 3000);
            return ;
        }

        Session.set("author", author);

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
    },
    "change #goodCategoryRadio": function() {
        var category;

        if($("#goodCategoryRadio").prop("checked", true)) {
            category = "good";
        }

        Session.set("category", category);
    },

    "change #badCategoryRadio": function() {
        var category;

        if($("#badCategoryRadio").prop("checked", true)) {
            category = "bad";
        }

        Session.set("category", category);
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
