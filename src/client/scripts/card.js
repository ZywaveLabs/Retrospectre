"use strict";
/* global Cards:false SnackbarMethods:false */

Template.card.helpers({
    cardInfo: function(_id) {
        return Cards.findOne({"_id": _id});
    },

    randomCardImage: function(){
        var imageArray = ["cloud.gif","aeris.png","barret.png","sephiroth.png",
        "tifa.png","vincent.png","yuffie.png","spectre.png"];
        var randImage;

        randImage = "/" +
          imageArray[Math.floor(Math.random() * imageArray.length)];
        return randImage;
    }
});

Template.card.events({
    "click #submitCommentButton": function(event){//eslint-disable-line
        event.preventDefault();
        var comment = event.target.form[0].value;
        var image = null;

        if(!comment || comment.length <= 4)
            SnackbarMethods.DisplayMessage("Enter a more valuable comment",500);
        else{
            var author;

            if(!Meteor.user())
                author = Session.get("author");
            else{
                author = Meteor.user().profile.name;
                image = UserMethods.getUserImage(Meteor.user()._id);//eslint-disable-line
            }
            var commentToAdd = new Comment().createdBy(author)
              .withText(comment).createdAtTime(new Date()).withProfile(image);

            Meteor.call("submitComment",this._id,commentToAdd);
            event.target.form[0].value = "";
            $("ul.collapsible li").show();
            $("i.fa-caret-right").addClass("fa-caret-down");
            $("i.fa-caret-right").removeClass("fa-caret-right");
        }
    },

    "submit #submitCommentButton": function(event){//eslint-disable-line
        event.preventDefault();
        var comment = event.target.form[0].value;
        var image = null;

        if(!comment || comment.length <= 4)
            SnackbarMethods.DisplayMessage("Enter a more valuable comment",500);
        else{
            var author;

            if(!Meteor.user())
                author = Session.get("author");
            else{
                author = Meteor.user().profile.name;
                image = UserMethods.getUserImage(Meteor.user()._id);//eslint-disable-line
            }
            var commentToAdd = new Comment().createdBy(author)
              .withText(comment).createdAtTime(new Date()).withProfile(image);

            Meteor.call("submitComment",this._id,commentToAdd);
            event.target.form[0].value = "";
            $("ul.collapsible li").show();
        }
    },

    "click span i.fa-caret-right": function(event){//eslint-disable-line
        event.toElement.className = "fa fa-caret-down";
        $("ul.collapsible li").show();
    },

    "click span i.fa-caret-down": function(event){//eslint-disable-line
        event.toElement.className = "fa fa-caret-right";
        $("ul.collapsible li").hide();
    }
});
