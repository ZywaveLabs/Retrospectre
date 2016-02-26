"use strict";

Mongo.Collection.get("cards").allow({
    update: function (userId, doc, fields, modifier) {
        return true;
    }
});
