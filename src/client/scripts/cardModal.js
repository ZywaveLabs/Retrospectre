"use strict";
/* global Cards:false SnackbarMethods:false UserMethods:false */

Template.cardModal.helpers({
    cardModalInfo: function(_id) {
        return Cards.findOne({"_id": _id});
    },
    cardTags: function(_id){
        var card = Cards.findOne({"_id": _id});
        var cardTags = card.tags;

        return cardTags.toString();
    }
});

Template.cardModal.events({
    "click #submitCommentButton": function(eve){
        eve.preventDefault();
        var comment = eve.target.parentNode.previousElementSibling.value;
        var image = null;

        if(!comment || comment.length <= 4)
            SnackbarMethods.DisplayMessage("Enter a more valuable comment",
              3000);
        else{
            var author;

            if(!Meteor.user())
                author = Session.get("author");
            else{
                author = Meteor.user().profile.name;
                image = UserMethods.getUserImage(Meteor.user()._id);
            }
            var commentToAdd = new Comment().createdBy(author)
              .withText(comment).createdAtTime(new Date()).withAvatar(image);

            Meteor.call("submitComment",this._id,commentToAdd);
            eve.target.parentNode.previousElementSibling.value;
            $("ul.collapsible li").show();
            $("i.fa-caret-right").addClass("fa-caret-down");
            $("i.fa-caret-right").removeClass("fa-caret-right");
        }
    },

    "click #removeTag": function(e){
        e.stopPropagation();
        var tags;
        var prevEleTag;
        var text;

        prevEleTag = e.target.previousElementSibling.innerHTML;
        prevEleTag = prevEleTag.toLowerCase();
        tags = $(e.toElement.parentNode.parentNode).find(".tag");
        text = $(e.toElement.parentNode.parentNode).find(".thought");
        text = text[0].innerText;
        var newTags;
        var oldTags;

        newTags = [];
        oldTags = [];
        var count;

        count = 0;
        for(var j = 0; j < tags.length; j++){
            oldTags[j] = tags[j].innerHTML;
        }
        for(var i = 0; i < oldTags.length; i++){
            if(oldTags[i].toLowerCase() != prevEleTag){
                newTags[count] = oldTags[i].toLowerCase();
                count++;
            }
        }
        Meteor.call("removeTag",text,oldTags,
          newTags,Session.get("roomNumber"));
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
        var thought = e.target.thought.value;
        var category = e.target.categoryDropdown.value;
        var newTags = e.target.tags.value;
        var tags = newTags.split(",");
        var tagSet = new Set();

        tags.forEach(v => tagSet.add(s(v).clean().titleize().value()));
        tagSet.delete(""); // Delete Empty tags from submission
        var tagArray = Array.from(tagSet);

        Session.set("editCardMode", false);
        $("#" + id).modal("hide");
        Meteor.call("updateCard", id, thought, category, tagArray);
    }
});
