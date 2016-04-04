// "use strict";
/*global RoomMethods:false ShareJS: false */
Template.room.helpers({
    config: function() {
        return function(editor) {
            editor.setTheme("ace/theme/pastel_on_dark");
            editor.setShowPrintMargin(false);
        };
    },

    docid: function() {
        var id = RoomMethods.getKeynoteID(Session.get("roomNumber"));

        return id;
    }
});

// create sync method
ShareJS.prototype.getSnapshotSync = function (docid) {
    return Meteor.wrapAsync(ShareJS.model.getSnapshot, docid);
};

Meteor.methods({

    getDocumentText: function(docid) {
        var result = ShareJS.getSnapshotSync(docid);

        return result.snapshot;
    }

});
