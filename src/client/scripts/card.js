"use strict";
/* global Cards:false */

Template.card.helpers({
    cardInfo: function(_id) {
        return Cards.findOne({"_id": _id});
    }
});


Template.card.events({
    "click .diseased_newt": function(){
        Session.set("editCardMode", false);
    }
});
