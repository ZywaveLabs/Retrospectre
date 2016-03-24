"use strict";
/*global RoomMethods:false*/
Template.room.helpers({
    config: function() {
        return function(editor) {
            editor.setTheme("ace/theme/pastel_on_dark");
            editor.setShowPrintMargin(false);
            var prevText;

            prevText = RoomMethods.getKeynotes(Session.get("roomNumber"));
            if (prevText && prevText.length != 0) {
                prevText = prevText.split("\n");
                var prevSavedText = "";

                for (var i = 0; i < prevText.length; i++) {
                    prevSavedText += prevText[i] + "\n";
                }
                editor.setValue(prevSavedText);
            }
        };
    },

    docid: function(){
        var id = RoomMethods.getKeynoteID(Session.get("roomNumber"));

        return id;
    }
});
