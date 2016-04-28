"use strict";
/* global Cards:false SnackbarMethods:false UserMethods:false DEFAULT_SNACKBAR_TIMEOUT:true Rooms:false*/
var MinCommentLen = 4;
Template.cardModal.helpers({
    cardModalInfo: function(_id) {
        return Cards.findOne({"_id": _id});
    },
    cardTags: function(_id){
        var card = Cards.findOne({"_id": _id});
        var cardTags = card.tags;

        return cardTags.toString();
    },
    showEditButton: function(_id){
        return (isOwner(_id) && Session.get("editCardMode") !== true)
        ? "visible"
        : "hidden";
    },
    inEditMode: function(){
        return Session.get("editCardMode") === true;
    },
    categories: function() {
        return Rooms.findOne(
            {"roomCode": Session.get("roomCode")}
        ).categories;
    }

});

Template.cardModal.events({
    "click #submitCommentButton": function(eve){
        eve.preventDefault();
        var commentToAdd = validComment(eve);
        if(commentToAdd){
            Meteor.call("submitComment",this._id,commentToAdd);
            eve.target.parentNode.previousElementSibling.value = "";
            $("ul.collapsible li").show();
            $("i.fa-caret-right").addClass("fa-caret-down");
            $("i.fa-caret-right").removeClass("fa-caret-right");
        }
    },

    "click #removeTag": function(e){
        e.stopPropagation();
        var init = 0;
        var tags;
        var prevEleTag  = e.target.previousElementSibling.innerHTML;
        var text = $(e.toElement.parentNode.parentNode).find(".thought");
        tags = $(e.toElement.parentNode.parentNode).find(".tag");
        text = text[init].innerText;
        var retTags = removeTags([],[],tags,prevEleTag.toLowerCase());
        Meteor.call("removeTag",text,retTags[init],retTags[init++],Session.get("roomCode"));
    },

    "click span i.fa-caret-right": function(eve){
        eve.toElement.className = "fa fa-caret-down";
        $("ul.collapsible li").show();
    },

    "click span i.fa-caret-down": function(eve){
        eve.toElement.className = "fa fa-caret-right";
        $("ul.collapsible li").hide();
    },
    "click .edit-card-button": function(eve){
        eve.preventDefault();
        $(eve.toElement).hide();
        Session.set("editCardMode", true);
    },
    "submit .addTags": function(e){
        e.preventDefault();
        var newTags = e.target.tags.value;
        var tags = newTags.split(",");
        var tagSet = new Set();

        tags.forEach(v => tagSet.add(s(v).clean().titleize().value()));
        var thisRoom = Rooms.findOne({_id:Session.get("roomCode")});
        var thisTags = thisRoom.tags;

        thisTags.forEach(v => tagSet.add(v));
        var tagArray = Array.from(tagSet);

        Meteor.call("addTags", tagArray);
    },
    "submit #edit-form": function (e) {
        e.preventDefault();
        var id = this._id;
        var thought = 0, cat = 1, tags = 2;
        var changes = grabEdits(e);
        $("#" + id).modal("hide");
        Session.set("editCardMode", false);
        Meteor.call("updateCard", id, changes[thought], changes[cat], changes[tags]);
    }
});
Template.registerHelper("equals", function (a, b) {
    return a === b;
});

function isOwner(_id){
    var card = Cards.findOne({"_id": _id});

    if (Meteor.user()) {
        if(Meteor.user().profile.name === card.author){
            return true;
        }
    } else if(Session.get("author") === card.author){
        return true;
    }
    return false;
}

function validComment(eve){
    var comment = eve.target.parentNode.previousElementSibling.value;
    var image = null;
    var commentToAdd = null;

    if(!comment || comment.length <= MinCommentLen)
        SnackbarMethods.DisplayMessage("Enter a more valuable comment",
          DEFAULT_SNACKBAR_TIMEOUT);
    else{
        var author;

        if(!Meteor.user())
            author = Session.get("author");
        else{
            author = Meteor.user().profile.name;
            image = UserMethods.getUserImage(Meteor.user()._id);
        }
        commentToAdd = new Comment().createdBy(author)
          .withText(comment).createdAtTime(new Date()).withAvatar(image);
    }
    return commentToAdd;
}

function removeTags(newTags,oldTags,tags,prevEleTag){
    var count = 0;
    for(var j = 0; j < tags.length; j++){
        oldTags[j] = tags[j].innerHTML;
    }
    for(var i = 0; i < oldTags.length; i++){
        if(oldTags[i].toLowerCase() !== prevEleTag){
            newTags[count] = oldTags[i].toLowerCase();
            count++;
        }
    }
    return  [oldTags,newTags];
}

function grabEdits(e){
    var thought = e.target.thought.value;
    var category = e.target.categoryDropdown.value;
    var newTags = e.target.tags.value;
    var tags = newTags.split(",");
    var tagSet = new Set();
    tags.forEach(v => tagSet.add(s(v).clean().titleize().value()));
    tagSet.delete(""); // Delete Empty tags from submission
    var tagArray = Array.from(tagSet);
    Session.set("editCardMode", false);
    return [thought,category,tagArray];
}
