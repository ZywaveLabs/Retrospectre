"use strict";
if (Meteor.isClient) {
    Template.card.events({

        "submit #card": function(){
            event.preventDefault();

            var author = event.target.author.value;
            var thought = event.target.thoughts.value;
            var tags = event.target.tags.value;
            var category = undefined;

            while(Session.get("roomNumber") == undefined) {
                Session.set("roomNumber",
                    prompt("Enter the designated room number."));
            }

            if(event.target.goodCategoryRadio.checked === true) {
                category = "good";
            } else if(event.target.badCategoryRadio.checked == true) {
                category = "bad";
            } else {
                alert("Enter a category for your thought");
                return ;
            }
            if(thought.length == 0) {
                alert("Enter a thought");
                return ;
            }
            if(author.length == 0) {
                alert("Who's thought is this?");
                return ;
            }

            Session.set("author", author);
            if(tags != null && tags != "" && tags != undefined){
                tags = findUniqueTags(tags.split(","));
                var cardData = [Session.get("roomNumber"),category,
                thought,tags,author];

                Meteor.call("submitCardWithTags",cardData);
            }
            else
              Meteor.call("submitCard", Session.get("roomNumber"),
                  category, thought,author);
            event.target.thoughts.value = "";
            event.target.tags.value = "";
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
}

/**
*@param {string[] } tags - array of strings describing the tags
*@return {string[] } uniqueTags - array of uniqueTags
**/
function findUniqueTags(tags){
    var uniqueTags = [];
    var count = 0;

    for(var i = 0; i < tags.length; i++){
        if(tags[i] != "''" && tags[i] != "" && tags[i].length !== 0){
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
