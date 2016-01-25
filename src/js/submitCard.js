"use strict";
/**
*@author TreJon House
*@date 1/18/16
*@verion 1.0
*@edited 1/24/16
*@purpose Once the room page is rendered, need to connect to
*the cards in current room and display them
**/
if (Meteor.isClient) {
  if (window.location.href.search("room") != -1) {
    //  will handle the events of the page
    Template.room.events({
      "click .btn-default": function (event) {
        event.preventDefault();
        while (Session.get("roomNumber") == undefined || isNaN(parseInt(Session.get("roomNumber"))))
          Session.set("roomNumber", prompt("Enter the designated room number."));
        if (completedForm()) {
          if ($("#wentWell:checked").val()) {
            Meteor.call("submitCard", Session.get("roomNumber"), "Went Well", $(".thoughts").val());
          } else {
            Meteor.call("submitCard", Session.get("roomNumber"), "Went Wrong", $(".thoughts").val());
          }
          $(".thoughts").val("");
        } else
          console.log("failed to insert");
      }
    });
  }
}
if (Meteor.isServer) {
}
/**
*Adding meteor methods give methods we can 
*call using meteor.call this mandatory
*when trying to handle the DB in any manner
*it revokes DB access to the client
*this is due to removing the insecure package
**/
Meteor.methods({
  submitCard: function (roomNumber, category, text) {
    Mongo.Collection.get("cards").insert({
      roomCode: roomNumber,
      category: category,
      createdAt: new Date(),
      text: text
    });
  }
});
function completedForm() {
  var text = $(".thoughts").val();
  var well = $("#wentWell:checked").val();
  var wrong = $("#wentWrong:checked").val();
  if (text == "" || text.length == 0 || !text)
    return false;
  if (well && wrong)
    return false;
  else if (!well && !wrong)
    return false;
  return true;
}
