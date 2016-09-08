"use strict";
/* global RoomMethods:false */
var AceEditor;

Template.room.helpers({
    config: function() {
        return function(editor) {
            AceEditor = editor;
            AceEditor.setTheme("ace/theme/pastel_on_dark");
            AceEditor.setShowPrintMargin(false);
        };
    },

    docid: function() {
        var id = RoomMethods.getKeynoteID(Session.get("roomCode"));

        return id;
    }
});
