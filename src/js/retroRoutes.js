"use strict";
/**
*@author TreJon House
*@created 1/13/16
*@verion 1.0
*@edited 1/13/16
*@purose To define routes for meteor to execute when a link is clicked
**/
// Configure a template that will used a layout
Router.configure({
    layoutTemplate: "headerFooter" // Name of template that contains header and footer used for each page
});
//create a route for when directed to the top level homepage
Router.route("/",{
    name: "Home",//give the route a name
    template: "landingPage",//name of template to render
    title: "Home"//title of template *for later use*
});

//create a route for the rooms
Router.route("/room",{
	name: "Room",
	template: "room",
	title: "The Poltergeists"
});

Router.route("/create-room", {
    name: "Create Room",
    template: "createRoom",
    title: "Create Room"
});

// If current session is on the client side then return the title of the current route taken
if(Meteor.isClient){

    Template.headerFooter.helpers({
        title:function(){
            return Router.current().route.options.title;
        }
    });
}
