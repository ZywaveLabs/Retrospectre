"use strict";

//TODO shouldnt this be Cards global not Mongo.Collections...
// Also what does this do? we are on the server do we need to
// specify what we can and cant do to the cards collection?
Mongo.Collection.get("cards").allow({
    update: function (userId, doc, fields, modifier) {
        return true;
    }
});
