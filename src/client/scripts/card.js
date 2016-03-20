"use strict";
/* global Cards:false */

Template.card.helpers({
    cardInfo: function(_id) {
        return Cards.findOne({"_id": _id});
    }
});
