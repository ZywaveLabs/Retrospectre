"use strict";
/**
*@author THouse
*@purpose To provide the room template with data to display
**/
var Cards = new Mongo.Collection("cards");
var allCards;
var wentWellCards;
var wentWrongCards;
var roomCode;
if (Meteor.isClient) {
  if (window.location.href.search("room") != -1) {
    // if the user enters the /room url or hits refresh the 
    // session storing the room number is lost so we need to
    // ask for one and verify it
    while (Session.get("roomNumber") == null || Session.get("roomNumber") == undefined || isNaN(parseInt(Session.get("roomNumber")))) {
      Session.set("roomNumber", prompt("Enter the designated room number."));
      roomCode = Session.get("roomNumber");
    }
  }
  // to provide a safer code base as far as
  // disallow the client as much control we need to subscribe to 
  // certain data
  Template.room.onCreated(function () {
    // upon the page redering we subscribe to 
    // the data in the DB
    this.subscribe("cards");
  });
  Template.room.helpers({
    // returns true/false if that room has cards stored in it
    haveCards: function () {
      var allCards = Cards.find({ roomCode: roomCode }, { sort: { createdAt: -1 } }).fetch();
      return allCards != null && allCards != undefined && allCards.length > 0;
    },
    // returns all cards in the went well category
    wentWell: function () {
      return wentWellCards = Cards.find({
        category: "Went Well",
        roomCode: roomCode
      }, { sort: { createdAt: -1 } });
    },
    // returns all the cards in the went wrong category
    wentWrong: function () {
      return wentWrongCards = Cards.find({
        category: "Went Wrong",
        roomCode: roomCode
      }, { sort: { createdAt: -1 } });
    }
  });
}
if (Meteor.isServer) {
  // publish cards data to the client
  Meteor.publish("cards", function () {
    return Cards.find({}, { sort: { createdAt: -1 } });
  });
}
