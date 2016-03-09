// /* eslint-disable */
/* global Cards:true CardMethods:true */

Cards = new Mongo.Collection("cards");
if(Meteor.isServer){
    Meteor.publish("cards", function() {
        return Cards.find({});
    });
} else {
    Meteor.subscribe("cards");
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
    var show = Cards.findOne({_id: id}, {reveal: true});

    Cards.update({_id: id}, {$set: {reveal: !show}});
};
