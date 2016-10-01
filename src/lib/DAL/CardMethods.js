/* global Cards:true CardMethods:true */

Cards = new Mongo.Collection("cards"); // eslint-disable-line
if(Meteor.isServer){
    Meteor.publish("cards", function(roomCode) {
        return Cards.find({"roomCode": roomCode});
    });
} else {
    Meteor.autorun(function() {
        Meteor.subscribe("cards", Session.get("roomCode"));
    });
}
CardMethods = {};

CardMethods.SubmitCard = function(cardObject) {
    Cards.insert(cardObject);
};

CardMethods.DeleteCard = function(cardId) {
    Cards.remove(cardId);
};

CardMethods.SubmitComment = function(id,comment) {
    var card = Cards.findOne({_id:id});
    var oldComments = card.comments;

    oldComments.push(comment);
    Cards.update({_id:id}, {$set:{comments:oldComments}});
};

CardMethods.AddTagToCard = function(id, text) {

};

CardMethods.AddTagsToCard = function(id, arrayOfTags) {

};

CardMethods.RemoveTagFromCard = function(id, text) {

};

CardMethods.IncrementLikes = function(id) {
    Cards.update({_id: id}, {$inc: { likes: 1}});
};

CardMethods.ToggleReveal = function(id) {
    // TODO: Test... also, actually use this
    var show = Cards.findOne({_id: id}).reveal;

    Cards.update({_id: id}, {$set: {reveal: !show}});
};

CardMethods.Update = function(id, thought, category, tags){
    Cards.update({_id:id}, {$set:{
        text: thought,
        tags: tags,
        category: category
        // lastUpdated: new Date() // Will add this later, not all cards have this field, and trying to this of a better way to do this rather than just having this at every update call
    }});
};

CardMethods.DeleteAllCardsInRoom = function(roomCode){
    Cards.remove({roomCode:roomCode});
};

CardMethods.DeleteAllCardsInRoomInCategory = function(roomCode, category){
    Cards.remove({ $and: [{roomCode:roomCode}, {category:category}] });
};
