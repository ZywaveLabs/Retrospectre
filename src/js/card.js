"use strict";

if (Meteor.isClient) {
    Template.card.events({

        "submit #card": function(eve){
            eve.preventDefault();

            var author = eve.target.author.value;
            var thought = eve.target.thoughts.value;
            var category = undefined;

            while(Session.get("roomNumber") == undefined) {
                Session.set("roomNumber",
                    prompt("Enter the designated room number."));
            }

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

            Meteor.call("submitCard", Session.get("roomNumber"),
                category, thought, author, 0, "Like");

            eve.target.thoughts.value = "";
        }
    });
}
