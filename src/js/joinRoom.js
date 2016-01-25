"use strict";
if (Meteor.isClient) {
  if (window.location.href.search("join-room") != -1) {
    Template.joinRoom.events({
      "click #joinRoom": function (event) {
        // ask for the desired room number
        var roomNumber = $("#roomCode:text").val();
        // parse it
        roomNumber = parseInt(roomNumber);
        // validate the room number
        if (roomNumber != null && !NaN) {
          Session.set("roomNumber", roomNumber);
          Router.go("/room");
        } else
          alert("An invalid room number was given, either ask for the number or create a new room.");
      }
    });
  }
}
if (Meteor.isServer) {
}
