"use strict";
if (Meteor.isClient) {
  Template.landingPage.events({
    "click #createRoomButton": function () {
      Router.go("Create Room");
    },
    "click #joinRoom": function (event) {
      Router.go("Join Room");
    }
  });
}
function findLastRoom() {
  var roomList = ROOMS.find({}, { sort: { id: -1 } }).fetch();
  if (roomList.length > 0)
    lastRoom = roomList[0].id;
  else
    lastRoom = null;
}
