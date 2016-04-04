"use strict";
/*global RoomMethods:false*/
Template.room.helpers({
    config: function() {
        return function(editor) {
            editor.setTheme("ace/theme/pastel_on_dark");
            editor.setShowPrintMargin(false);
        };
    },

    docid: function(){
        var id = RoomMethods.getKeynoteID(Session.get("roomNumber"));

        return id;
    }
});
