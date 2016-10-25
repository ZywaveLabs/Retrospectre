"use strict";
/* global Cards:false */

Template.search.events({
    "keyup #filters": function(eve) { // eslint-disable-line
        var inputValue = eve.target.value;
        var splitInputArray = inputValue.split(",");
        var listOfFilters = {};

        for(var i in splitInputArray) {
            var str = splitInputArray[i];
            var key = "";
            var value = str;

            // a ':' in the input indcates a search for a certain field
            if(str.includes(":")) {
                key = normalizeString(str.slice(0, str.indexOf(":")));
                value = normalizeString(str.slice(str.indexOf(":") + 1, str.length));
            }
            if(listOfFilters[key] === undefined) {
                listOfFilters[key] = [];
            }
            listOfFilters[key].push(value);
        }
        Session.set("searchQuery", listOfFilters);
    }
});

Template.search.helpers({
    infoToolTip: function() {
        var mapping = Session.get("searchKeyMapping");

        var toolTipString = "Seperate search terms by a comma(,).\n" +
                            "Search a field use format:   FIELD_NAME: SEARCH_CRITERIA\n" +
                            "Invalid keys are ignored. Valid search key mapping:\n";
        for(var key in mapping) {
            if(mapping[key] !== undefined) {
                toolTipString += key + ": ";
                for(var value in mapping[key]) {
                    toolTipString += mapping[key][value] + " ";
                }
                toolTipString += "\n";
            }
        }
        return toolTipString;
    }
});

function normalizeString(string) {
    return string.toLowerCase().trim();
}
