/* global Cards:false */

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
                Session.get("roomNumber") == undefined) {
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

    Template.room.events({
        "click #revealCardButton": function(){
            Meteor.call("revealCards", Session.get("roomNumber"));
        },

        "click #deleteCardButton": function(){
            Meteor.call("deleteCard",this._id);
        },

        "click #likeButton": function(){
            Mongo.Collection.get("cards").update({ _id: this._id},
                { $inc: {likes: 1} });
        }
    });
}

if (Meteor.isServer) {

    // publish cards data to the client
    Meteor.publish("cards", function () {
        return Cards.find({}, { sort: { createdAt: -1 } });
    });

    Mongo.Collection.get("cards").allow({
        update: function (userId, doc, fields, modifier) {
            return true;
        }
    });
}
