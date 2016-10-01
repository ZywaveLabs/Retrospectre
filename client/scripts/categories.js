/* globals Rooms:false RoomMethods:false SnackbarMethods:false Room:false DEFAULT_SNACKBAR_TIMEOUT:false*/
"use strict";
/*
// default categories
var defaultCategories = [{category:"Went Well", color:"#81c784"},
                {category:"Went Poorly", color:"#f44336"},
              {category:"Kudoz", color:"#2196f3"}];

// Template.categories.created = function() {
//     // default categories
//     this.currentCategories = defaultCategories;
//     this.categoriesDep = new Tracker.Dependency();
// };

Template.categories.helpers({
    colorPicker: function(color) {
        return {
            id: "cardBackgroundColor",
            type: "color",
            value: color
        };
    },
    getCategories: function() {
        Template.instance().categoriesDep.depend();
        return Template.instance().currentCategories;
    }
});

Template.categories.events({
    "submit .customCategory": function(eve) {// eslint-disable-line
        eve.preventDefault();
        var tmpl = Template.instance();
        var customCategory = eve.target.addCustomCategory.value;
        if(isDuplicate(tmpl, customCategory))
            return;
        var nullStr = 0;
        if(customCategory !== undefined && customCategory.length > nullStr) {
            var range = 256;
            var colorValue = genRandomColor(range);

            tmpl.currentCategories.push({category:customCategory,
                color:colorValue});
            tmpl.categoriesDep.changed();
            eve.target.addCustomCategory.value = "";
        }
    },

    "click #removeCategory": function() {
        var tmpl = Template.instance();
        var numToRemove = 1;
        tmpl.currentCategories.splice(tmpl.currentCategories.indexOf(this), numToRemove);
        tmpl.categoriesDep.changed();
    },

    "change #cardBackgroundColor": function(eve) {
        this.color = eve.target.value;
    }
});

function genRandomColor(range){
    var r = Math.floor(Math.random() * (range));
    var g = Math.floor(Math.random() * (range));
    var b = Math.floor(Math.random() * (range));
    var base = 16;// prints to hex
    return "#" + r.toString(base) +
            g.toString(base) + b.toString(base);
}

function isDuplicate(tmpl, customCategory){
    for(var i = 0; i < tmpl.currentCategories.length; i++) {
        if(tmpl.currentCategories[i].category === customCategory){
            SnackbarMethods.DisplayMessage(
                "Please enter a unique category", DEFAULT_SNACKBAR_TIMEOUT);
            return true;
        }
    }
    return false;
}
*/
