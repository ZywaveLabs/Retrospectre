/* global RoomMethods */
"use strict";

Router.configure({
    layoutTemplate: "headerFooter"
});

Router.route("/", {
    name: "Home",
    template: "landingPage",
    title: "Home"
});

Router.route("/room/:_roomNumber", {
    name: "Room",
    path: "/room/:_roomNumber",
    template: "room",
    title: "The Poltergeists",
    waitOn: function() {
        console.log("subscribing");
        return Meteor.subscribe("rooms");
    },
    onBeforeAction: function (){
        if(RoomMethods.RoomExists(this.params._roomNumber)){
            console.log("routing");
            Session.set("roomNumber", this.params._roomNumber);
            this.next();
        }else{
            console.log("Room does not exist, redirecting to home"); // eslint-disable-line
            this.redirect("/");
        }
    }
});

Router.route("/create-room", {
    name: "Create Room",
    template: "createRoom",
    title: "Create Room"
});

//  If current session is on the client side then return the title of the current route taken
if (Meteor.isClient) {
    Template.headerFooter.helpers({
        title: function () {
            document.title = "Retrospectre - " +
            Router.current().route.options.title;
            return Router.current().route.options.title;
        }
    });
}
