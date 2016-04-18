"use strict";
/* global Cards:false */
Template.card.onRendered(function(){
    for (var i = 0; i < $("span.card-text").length; i++) {
        var text = $("span.card-text").eq(i).html();

        if(text.length >= 25){
            text = text.substring(0,text.length / 2) + "...";
            $("span.card-text").eq(i).html(text);
        }
    }
});

Template.card.helpers({
    cardInfo: function(_id) {
        return Cards.findOne({"_id": _id});
    }
});

Template.card.events({
    "click .card-panel": function(eve){
        if($(window).width() <= 768){
            $(eve.target.nextElementSibling).modal("show");
            $(eve.target.nextElementSibling).show();
        }
    },
    "click .diseased_newt": function(){
        Session.set("editCardMode", false);
    }
});
