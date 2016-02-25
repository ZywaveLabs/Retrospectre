"use strict";
Template.card.events({

    "submit #card": function(eve){
        eve.preventDefault();

        var author = eve.target.author.value;
        var thought = eve.target.thoughts.value;
        var tags = eve.target.tags.value;

        var category = undefined;

        if(eve.target.goodCategoryRadio.checked === true) {
            category = "good";
        } else if(eve.target.badCategoryRadio.checked == true) {
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
            //TODO
            /*make into object array and just have one method to
            *submit cards not two sep
            */
            /* cardData []
            *[0] - room code
            *[1] - category
            *[2] - thoughts
            *[3] - tags
            *[4] - likes
            *[5] - author
            */
            var cardData = [Session.get("roomNumber"),category,
            thought,tags,0,author];

            Meteor.call("submitCardWithTags",cardData);
        }else{
            Meteor.call("submitCard", Session.get("roomNumber"),
            category, thought, author, 0);
        }
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