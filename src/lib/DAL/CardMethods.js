// /* eslint-disable */
/* global Cards:true CardMethods:true ProgramUtils:true */

Cards = new Mongo.Collection("cards");
if(Meteor.isServer){
    Meteor.publish("cards", function() {
        return Cards.find({});
    });
} else {
    Meteor.subscribe("cards");
}
CardMethods = {};

/*
CardObject
roomCode - {string} Room that the card is in
category - {string} Category for card
createdAt - {datetime} Will default to now, but can pass a time for testing
text - {string} Text displayed on card
tags - {string[]} Tags that the card should have to start with
likes - {int} Number the likes a card has
author - {string} Author of the card
reveal - {boolean} If the card should be visible to everyone besides author
comments - {object[]} Comments added to card after creation as notes
*/

/*
CommentObject
author - {string} - UserId
text - {string} - Comment
createdAt - {datetime} - Created at time
*/

CardMethods.SubmitCard = function(cardObject) {
    var defaultCard = {
        roomCode: "",
        category: "",
        createdAt: new Date(),
        text: "",
        tags: [],
        likes: 0,
        author: "Anonymous",
        reveal: false,
        comments: []
    };

    Cards.insert(ProgramUtils.DefaultObjectValues(cardObject, defaultCard));
};

CardMethods.DeleteCard = function(id) {
    Cards.remove(id);
};

CardMethods.AddTagToCard = function(id, text) {

};

CardMethods.RemoveTagFromCard = function(id, text) {

};

CardMethods.IncrementLikes = function(id) {

};

CardMethods.ToggleReveal = function(id) {
    var show = Cards.findOne({_id: id}, {reveal: true});

    Cards.update({_id: id}, {$set: {reveal: !show}});
};
