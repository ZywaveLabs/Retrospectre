"use strict";
/* global Cards:false */

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
