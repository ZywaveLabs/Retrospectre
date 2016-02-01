"use strict";
/**
*@author THouse
*@purpose To provide the room template with data to display
**/
var Cards = new Mongo.Collection("cards");


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

        cards : function(){
            while(Session.get("roomNumber") == undefined ||
             isNaN(parseInt(Session.get("roomNumber")))) {
                Session.set("roomNumber",
                    prompt("Enter the designated room number."));
            }

            // return all cards in db sort by newest
            return Cards.find({
                roomCode:Session.get("roomNumber")},
                {sort: {createdAt: -1}});
        },

        goodCards : function() {
            return Cards.find({
                "roomCode":Session.get("roomNumber"),
                "category":"good"});
        },

        badCards : function() {
            return Cards.find({
                "roomCode":Session.get("roomNumber"),
                "category":"bad"});
        }
    });

    Template.card.events({

        "click #submitCardButton": function(){
            event.preventDefault();

            while(Session.get("roomNumber") == undefined ||
             isNaN(parseInt(Session.get("roomNumber")))) {
                Session.set("roomNumber",
                    prompt("Enter the designated room number."));
            }

            if(Session.get("category") === undefined) {
                alert("Enter a category for your thought");
                return;
            }

            Meteor.call("submitCard", Session.get("roomNumber"),
                Session.get("category"), $(".thoughts").val());

            $(".thoughts:text").val("");
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

    Template.room.events({
        "click #deleteCardButton": function(){
            Meteor.call("deleteCard",this._id);
        }
    });
}

if (Meteor.isServer) {

    // publish cards data to the client
    Meteor.publish("cards", function () {
        return Cards.find({}, { sort: { createdAt: -1 } });
    });
}
