"use strict";
/* global Cards:false Rooms:false */
const MAX_COL_PER_ROW = 4;
var uniqueIdCount = 0;

Template.cardGrid.onRendered(function(){
    Session.set("getUniqueID_CallCount",uniqueIdCount);
    Session.set("pairSet",false);
});

Template.cardGrid.onCreated(function() {
    var cards = Cards.find({
                "roomCode": Session.get("roomCode"),
            }, {sort: {createdAt:-1}});
    console.log("FFF");
    console.log(cards);
    Session.set("cardCollection", cards);
});

Template.cardGrid.helpers({

    validMultiRow: function(){
        var categories = Rooms.findOne(
          {"roomCode": Session.get("roomCode")}
      ).categories;
        var len = categories.length;

        return len > MAX_COL_PER_ROW;
    },

    getRow: function(){
        var rowOfCategories = [];
        var categories = Rooms.findOne(
          {"roomCode": Session.get("roomCode")}
      ).categories;
        var numOfRowsOfCategories = Math.floor(MAX_COL_PER_ROW / categories.length);

        numOfRowsOfCategories += MAX_COL_PER_ROW % categories.length;
        rowOfCategories = populateRows(rowOfCategories,numOfRowsOfCategories,categories);
        return rowOfCategories;
    },

    getCategories: function() {
        return Rooms.findOne(
          {"roomCode": Session.get("roomCode")}
      ).categories;
    },

    getColSpacing: function(isCategory){
        var maxBootStrapColSpacing = 12;
        var spaceForForm = 1;
        var cat = Rooms.findOne(
          {"roomCode": Session.get("roomCode")}
      ).categories;

        if(isCategory === true)
            return Math.floor(maxBootStrapColSpacing / cat.length) - spaceForForm;
        return Math.floor(maxBootStrapColSpacing / cat.length);
    },

    cards : function(category) { 

        var roomData = Rooms.findOne({"roomCode": Session.get("roomCode")});
        var author;

        if(Meteor.user()){
            author = Meteor.user().profile.name;
        } else {
            author = Session.get("author");
        }

        //TODO bad variable override and shit stuff
        var filterQuery = Session.get("filterQuery");

        if(filterQuery === undefined) {
            filterQuery = [{}];
        } else {
            var objectList = [];
            for(var key in filterQuery) {
                var valueArr = filterQuery[key];
                for(var value in valueArr) {
                        var obj = {};
                        obj[key] = {$regex: new RegExp(valueArr[value], "i")};
                        objectList.push(obj);
                    }
            }
            // var filter = {"tags": {$regex: new RegExp("four", "i")}}, {"tags": {$regex: new RegExp("for", "i")}};
            console.log("Filter::");
            //console.log(filter);
            console.log(objectList);
            console.log("FILTER::");
            filterQuery = objectList;
        }

        var q = {
                "roomCode": Session.get("roomCode"),
                "category": category,
                $and:filterQuery
            };

        console.log("::::  Q:::: ")
        console.log(q);
        if(roomData.reveal){
            return Cards.find(q, {sort: {createdAt:-1}}).fetch();
        } else {
            return Cards.find({
                "roomCode": Session.get("roomCode"),
                "category": category,
                $or: [{"reveal": true}, {"author": author}],
                $and:filterQuery
            }, {sort: {createdAt: -1}}).fetch();
        }
        // if(q != "") {
        //     return Cards.find({
        //             "roomCode": Session.get("roomCode"),
        //             "category": category,
        //         }, {sort: {createdAt:-1}}).fetch();
        // }

        // return Cards.find({
        //         "roomCode": Session.get("roomCode"),
        //         "category": category,
        //     }, {sort: {createdAt:-1}}).fetch();
        //return Session.get("cardsCollection");
        //var x = Session.get("cardCollection");
        //console.log("HELLLOOOOOOO");
        //console.log(x);
        //return x;
        /*var roomData = Rooms.findOne({"roomCode": Session.get("roomCode")});
        var cards = [];
        var author;

        if(Meteor.user()){
            author = Meteor.user().profile.name;
        } else {
            author = Session.get("author");
        }
        if(roomData.reveal){
            cards = Cards.find({
                "roomCode": Session.get("roomCode"),
                "category": category,
            }, {sort: {createdAt:-1}});
        } else {
            cards = Cards.find({
                "roomCode": Session.get("roomCode"),
                "category": category,
                $or: [{"reveal": true}, {"author": author}]
            }, {sort: {createdAt: -1}});
        }
        return cards;*/
        //TODO calling this in search make better
        //console.log(findCards());
        // return Cards.find({
        //         "roomCode": Session.get("roomCode"),
        //         "category": category,
        //     }, {sort: {createdAt:-1}});
        //Meteor.call("getFilteredCollection");
        //return Session.get("cardsCollection");
        // return Cards.find({
        //         "roomCode": Session.get("roomCode"),
        //         "category": category,
        //     }, {sort: {createdAt:-1}});

    },

    getUniqueID: function(category){
        return category.replace(/\s/g, "");
    }
});

Template.cardGrid.events({
    "click div.col-xs-2 span": function(eve){
        var maxWidth = 768;
        if($(window).width() < maxWidth){
            var dataTarget = eve.currentTarget.dataset.target;
            $("div.modal" + dataTarget).modal("toggle");
        }
    }
});

function populateRows(rowsOfCategories,numOfRowsOfCategories,categories){
    var index = 0;
    /* creates an array of subarray
    *  each subarray holds category
    *  im using this technique to creates
    *  a more bootstrap grid view
    */
    for (var i = 0; i < numOfRowsOfCategories; i++) {
        rowsOfCategories[i] = new Array();
    }
    for (var j = 0; j < categories.length; index++) {
        for (var k = 0; k < MAX_COL_PER_ROW && j < categories.length; k++) {
            rowsOfCategories[index][k] = categories[j];
            j++;
        }
    }
    return rowsOfCategories;
}
