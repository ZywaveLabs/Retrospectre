"use strict";
/* global Cards:false */

Template.search.events({
    "keyup #filters": function(eve) {
        var inputValue = eve.target.value;
        var splitInputArray = inputValue.split(",");
        var listOfFilters = {};

        for(var i in splitInputArray) {
            var str = splitInputArray[i];
            var key = "";
            var value = str;

            // a ':' in the input indcates a search for a certain field
            if(str.includes(":")) {
                key = normalizeString(str.slice(0, str.indexOf(':')));
                value = normalizeString(str.slice(str.indexOf(':') + 1, str.length));
            }
            if(listOfFilters[key] === undefined) {
                listOfFilters[key] = [];
            }
            listOfFilters[key].push(value);
        }
        
        Session.set("searchQuery", listOfFilters);
    }
});

function normalizeString(string) {
    return string.toLowerCase().trim();
}

