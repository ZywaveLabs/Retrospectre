"use strict";

// publish cards data to the client
Meteor.publish("cards", function () {
    return Cards.find({},
      { sort: { createdAt: -1 } });
});

Mongo.Collection.get("cards").allow({
    update: function (userId, doc, fields, modifier) {
        return true;
    }
});
