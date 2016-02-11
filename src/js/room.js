"use strict";
/**
*@author THouse
*@purpose To provide the room template with data to display
**/


if (Meteor.isClient) {
    // to provide a safer code base as far as
    // disallow the client as much control we need to subscribe to
    // certain data
    Template.room.onCreated(function () {
        // upon the page redering we subscribe to
        // the data in the DB
        this.subscribe("cards");

        // if the user enters the /room url or hits refresh the
        // session storing the room number is lost so we need to
        // ask for one and verify it
        while (Session.get("roomNumber") == null ||
                Session.get("roomNumber") == undefined ||
                isNaN(parseInt(Session.get("roomNumber")))) {

            Session.set("roomNumber",
                parseInt(prompt("Enter the designated room number.")));
            Router.go("/room/" + Session.get("roomNumber"));
        }

    });

    Template.room.helpers({

        goodCards : function() {
            var author = Session.get("author");

            return Cards.find({
                "roomCode": Session.get("roomNumber"),
                "category": "good",
                $or: [{"reveal": true}, {"author": author}]
            });
        },

        badCards : function() {
            var author = Session.get("author");
            
            return Cards.find({
                "roomCode": Session.get("roomNumber"),
                "category": "bad",
                $or: [{"reveal": true}, {"author": author}]
            });
        }
    });

    // Template.card.events({

    //     "submit #card": function(){
    //         event.preventDefault();

    //         var author = event.target.author.value;
    //         var thought = event.target.thoughts.value;
    //         var category = undefined;

    //         while(Session.get("roomNumber") == undefined ||
    //          isNaN(parseInt(Session.get("roomNumber")))) {
    //             Session.set("roomNumber",
    //                 prompt("Enter the designated room number."));
    //         }

    //         if(event.target.goodCategoryRadio.checked === true) {
    //             category = "good";
    //         } else if(event.target.badCategoryRadio.checked == true) {
    //             category = "bad";
    //         } else {
    //             alert("Enter a category for your thought");
    //             return ;
    //         }
    //         if(thought.length == 0) {
    //             alert("Enter a thought");
    //             return ;
    //         }
    //         if(author.length == 0 ) {
    //             alert("Who's thought is this?");
    //             return ;
    //         }

    //         Session.set("author", author);

    //         Meteor.call("submitCard", Session.get("roomNumber"),
    //             category, thought, author);

    //         event.target.thoughts.value = "";
    //     }
    // });

    Template.room.events({

        "click #revealCardButton": function(){
            Meteor.call("revealCards", Session.get("roomNumber"));
        },

        "click #deleteCardButton": function(){
            Meteor.call("deleteCard", this._id);
        }
    });
}

if (Meteor.isServer) {

    // publish cards data to the client
    Meteor.publish("cards", function () {
        return Cards.find({}, { sort: { createdAt: -1 } });
    });
}
