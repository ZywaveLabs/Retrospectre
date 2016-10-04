"use strict";
/* global Cards:false */

// var filters = {"author", "comment", "tag", "general"};
// var authorFilter = {};
// var commentFilter = {};
// var tagFilter = {};
// var generalFilter = {};

// var options = {
//   keepHistory: 1000 * 60 * 5,
//   localSearch: true
// };
// var fields = ['text', 'author'];

// CardSearch = new SearchSource('Cards', fields, options);

// //TODO sould be on server
// SearchSource.defineSource('Cards', function(searchText, options) {
//   var options = {sort: {isoScore: -1}, limit: 20};
  
//   if(searchText) {
//     var regExp = buildRegExp(searchText);
//     var selector = {$or: [
//       {text: regExp},
//       {author: regExp}
//     ]};
    
//     return Cards.find(selector, options).fetch();
//   } else {
//     return Cards.find({}, options).fetch();
//   }
// });

// function buildRegExp(searchText) {
//   // this is a dumb implementation
//   var parts = searchText.trim().split(/[ \-\:]+/);
//   return new RegExp("(" + parts.join('|') + ")", "ig");
// }

// getCardsFromSearch = function() {
//     return "HELLO MATTTY";
// }

var searchFilter;
var collection;
var filteredCollection;

Template.search.helpers({

});

Template.search.events({
    //throttle to avoid sending every key stroke to server
    //  "keyup #search-box": _.throttle(function(e) {
    //     var text = $(e.target).val().trim();
    //     PackageSearch.search(text);
    // }, 200),

    "submit #tagSearchForm": function(eve, templateData){
        eve.preventDefault();
        var searchFilter = eve.target.filters.value;
        var filterSplit = searchFilter.split(",");
        //filter
        var query = {};
        for(var i in filterSplit) {
            var str = filterSplit[i]
            if(str.includes(":")) {
                var pair = str.split(":");

                var key = pair[0].trim().toLowerCase();
                var value = pair[1].trim().toLowerCase();

                if(query[key] === undefined) {
                    query[key] = [];
                }
                query[key].push(value);
            } else {
                //TODO filter any
            }
        }
        
        Session.set("filterQuery", query);
    },



    "click #clearFilter": function(){
        Session.set("filterQuery", undefined);
        $("#filters").val("");
    }
});



