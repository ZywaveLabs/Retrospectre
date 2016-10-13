/* globals Rooms:false RoomMethods:false SnackbarMethods:false Room:false DEFAULT_SNACKBAR_TIMEOUT:false*/
"use strict";

// default categories
var defaultCategories = [{category:"Went Well", color:"#81c784"},
                {category:"Went Poorly", color:"#f44336"},
              {category:"Kudoz", color:"#2196f3"}];

Template.categoriesSelector.created = function() {
    this.currentCategories = defaultCategories;
    if(this.data.currentCategories !== undefined)
        this.currentCategories = this.data.currentCategories;
    this.categoriesDep = new Tracker.Dependency();
};

Template.categoriesSelector.helpers({
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

Template.categoriesSelector.events({
    "submit .customCategory": function(eve) {// eslint-disable-line
        eve.preventDefault();
        var tmpl = Template.instance();
        var customCategory = eve.target.addCustomCategory.value;
        if(isDuplicate(tmpl, customCategory)){
            SnackbarMethods.DisplayMessage("A category with that name exists",
                DEFAULT_SNACKBAR_TIMEOUT);
            return;
        }
        var nullStr = 0;
        if(customCategory !== undefined && customCategory.length > nullStr) {
            var range = 256;
            var colorValue = genRandomColor(range);

            if(tmpl.data.onCategoryAdded !== undefined
                && !tmpl.data.onCategoryAdded(tmpl.currentCategories, customCategory, colorValue))
                return;
            tmpl.currentCategories.push({category:customCategory,
                color:colorValue});
            tmpl.categoriesDep.changed();
            eve.target.addCustomCategory.value = "";
        }
    },

    "click #removeCategory": function() {
        var tmpl = Template.instance();
        if(tmpl.data.onCategoryRemoved !== undefined
            && !tmpl.data.onCategoryRemoved(tmpl.currentCategories, this))
            return;
        console.log("test");
        var numToRemove = 1;
        tmpl.currentCategories.splice(tmpl.currentCategories.indexOf(this), numToRemove);
        tmpl.categoriesDep.changed();
    },

    "change #cardBackgroundColor": function(eve) {
        var tmpl = Template.instance();
        if(tmpl.data.onColorChanged !== undefined
            && !tmpl.data.onColorChanged(tmpl.currentCategories, this.category, eve.target.value)){
            eve.target.value = this.color;
            return;
        }
        this.color = eve.target.value;
    },

    "click #info": function(eve){
        console.log(Template.instance().currentCategories);
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
