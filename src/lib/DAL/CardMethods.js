// /* eslint-disable */
/* global Cards:true CardMethods:true */

Cards = new Mongo.Collection("cards");
if(Meteor.isServer){
    Meteor.publish("cards", function(roomCode) {
        return Cards.find({"roomCode": roomCode});
    });
} else {
    Meteor.autorun(function() {
        Meteor.subscribe("cards", Session.get("roomNumber"));
    });
}
CardMethods = {};

CardMethods.SubmitCard = function(cardObject) {
    Cards.insert(cardObject);
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
    // TODO: Test... also, actually use this
    var show = Cards.findOne({_id: id}).reveal;

    Cards.update({_id: id}, {$set: {reveal: !show}});
};
