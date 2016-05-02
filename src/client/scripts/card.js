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
    }
});
