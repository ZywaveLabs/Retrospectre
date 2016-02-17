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
                tags = tags.split(",");
                Meteor.call("submitCardWithTags", Session.get("roomNumber"),
                  category,thought,tags,author);
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
