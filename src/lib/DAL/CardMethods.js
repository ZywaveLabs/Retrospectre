/* global Cards:true CardMethods:true */
/*eslint-disable*/
Cards = new Mongo.Collection("cards"); // eslint-disable-line
if (Meteor.isServer) {
    Meteor.publish("cards", function(roomCode) {
        return Cards.find({
            "roomCode": roomCode
        });
    });
} else {
    Meteor.autorun(function() {
        Meteor.subscribe("cards", Session.get("roomCode"));
    });
}
CardMethods = {};

CardMethods.SubmitCard = function(cardObject) {
    Cards.update({
        $and: [{
            roomCode: cardObject.roomCode
        }, {
            category: cardObject.category
        }]
    }, {
        $inc: {
            position: 1
        }
    }, {
        multi: true
    });
    Cards.insert(cardObject);
};

CardMethods.DeleteCard = function(cardId) {
    var cardToDel = Cards.findOne({
        _id: cardId
    });
    var roomCode = cardToDel.roomCode;
    decrementPosition(roomCode, cardToDel.category, cardToDel.position);
    Cards.remove(cardId);
};

CardMethods.SubmitComment = function(id, comment) {
    var card = Cards.findOne({
        _id: id
    });
    var oldComments = card.comments;

    oldComments.push(comment);
    Cards.update({
        _id: id
    }, {
        $set: {
            comments: oldComments
        }
    });
};

CardMethods.AddTagToCard = function(id, text) {

};

CardMethods.AddTagsToCard = function(id, arrayOfTags) {

};

CardMethods.RemoveTagFromCard = function(id, text) {

};

CardMethods.IncrementLikes = function(id) {
    Cards.update({
        _id: id
    }, {
        $inc: {
            likes: 1
        }
    });
};

CardMethods.ToggleReveal = function(id) {
    // TODO: Test... also, actually use this
    var show = Cards.findOne({
        _id: id
    }).reveal;

    Cards.update({
        _id: id
    }, {
        $set: {
            reveal: !show
        }
    });
};

CardMethods.Update = function(id, thought, newCardCategory, tags) {
    var cardToUpdate = Cards.findOne({
        _id: id
    });
    var roomCode = cardToUpdate.roomCode;
    var oldCategory = cardToUpdate.category;
    if (oldCategory !== newCardCategory) {
        decrementPosition(roomCode, oldCategory, cardToUpdate.position);
        incrementPositionB(roomCode,newCardCategory,0);
  }
  else{
    updateSingleCard(id,thought,tags,category,cardToUpdate.comments,cardToUpdate.position);
  }
};

CardMethods.DeleteAllCardsInRoom = function(roomCode) {
    Cards.remove({
        roomCode: roomCode
    });
};

CardMethods.DeleteAllCardsInRoomInCategory = function(roomCode, category) {
    Cards.remove({
        $and: [{
            roomCode: roomCode
        }, {
            category: category
        }]
    });
};

CardMethods.UpdatePosition = function(cardId, currPosition, currCategory, newCardCategory, siblingPos) {
    var roomCode = Cards.findOne({
        _id: cardId
    }).roomCode;
    //decrement existing cards by one in currCategory
    if(currCategory === newCardCategory){
      incrementPositionA(roomCode,currCategory,currPosition,siblingPos);
    }else{
      decrementPosition(roomCode, currCategory, currPosition);
      incrementPositionB(roomCode,newCardCategory,siblingPos);
    }

    Cards.update({
        _id: cardId
    }, {
        $set: {
            position: siblingPos,
            category: newCardCategory
        }
    });
};
function incrementPositionA(roomCode, currCategory,currPosition,siblingPos){
    Cards.update({
      $and:[{roomCode:roomCode},{category:currCategory},{position:{$lt:currPosition}},{position:{$gte:siblingPos}}]
    },{$inc:{position:1}},{multi:true});
}
function decrementPosition(roomCode, currCategory, currPosition){
    Cards.update({
      $and:[{roomCode:roomCode},{category:currCategory},{position:{$gt:currPosition}}]
    },{$inc:{position:-1}},{multi:true});
}
function incrementPositionB(roomCode,newCardCategory,siblingPos){
    Cards.update({
      $and:[{roomCode:roomCode},{category:newCardCategory},{position:{$gte:siblingPos}}]
    },{$inc:{position:1}},{multi:true});
}

function updateSingleCard(id, thought,tags,category,comments,position){
  Cards.update({
      _id: id
  }, {
      $set: {
          text: thought,
          tags: tags,
          category: category,
          comments:comments,
          position: position
      }
  });
}
