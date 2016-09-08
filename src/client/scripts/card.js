"use strict";
/* global Cards:false */
Template.card.helpers({
    cardInfo: function(_id) {
        return Cards.findOne({"_id": _id});
    }
});

Template.card.events({
    "click .card-panel": function(){
        var maxwidth = 768;
        if($(window).width() < maxwidth){
            $("div.modal#" + this._id).modal("toggle");
        }
    },
    "click .disable-editmode": function(){
        Session.set("editCardMode", false);
    },
    "click #likeButton": function(eve){
        eve.stopPropagation();
        if(eve.target.id === "likeButton") {
            eve.target.disabled = true;
        } else if(eve.target.parentNode.id === "likeButton") {
            eve.target.parentNode.disabled = true;
        }

        Meteor.call("incrementLikes", this._id);
    }
});
