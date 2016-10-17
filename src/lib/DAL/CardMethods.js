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
    var cat = cardToDel.category;
    Cards.update({
            $and: [{
                roomCode: roomCode
            }, {
                category: cat
            }, {
                position: {
                    $gt: cardToDel.position
                }
            }]
        },
        {
            $inc: {
                position: -1
            }
        },
        {
            multi: true
        }
    );
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

CardMethods.Update = function(id, thought, category, tags) {
    var cardToUpdate = Cards.findOne({
        _id: id
    });
    var roomCode = cardToUpdate.roomCode;
    var cat = cardToUpdate.category;
    //update other cards position upon update
    Cards.update({
            $and: [{
                roomCode: roomCode
            }, {
                category: cat
            }, {
                position: {
                    $gt: cardToUpdate.position
                }
            }]
        },
        {
            $inc: {
                position: -1
            }
        },
        {
            multi: true
        }
    );
    //update existing card's position before updating card
    Cards.update({
            $and: [{
                roomCode: roomCode
            }, {
                category: category
            }]
        },
        {
            $inc: {
                position: 1
            }
        },
        {
            multi: true
        }
    );
    Cards.update({
        _id: id
    }, {
        $set: {
            text: thought,
            tags: tags,
            category: category,
            position:0
                // lastUpdated: new Date() // Will add this later, not all cards have this field, and trying to this of a better way to do this rather than just having this at every update call
        }
    });
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

CardMethods.UpdatePositionLast = function(cardId, currPosition, currCategory, newCardCategory) {
    var roomCode = Cards.findOne({
        _id: cardId
    }).roomCode;
    //change cards whose position is greater than curr card position decrement -1
    //updates the cards of t original category
    Cards.update({
        $and: [{
            roomCode: roomCode
        }, {
            category: currCategory
        }, {
            position: {
                $gt: currPosition
            }
        }]
    }, {
        $inc: {
            position: -1
        }
    }, {
        multi: true
    });
    cards = Cards.find({
        $and: [{
            roomCode: roomCode
        }, {
            category: newCardCategory
        }]
    }, {
        sort: {
            position: -1
        }
    });
    cards = cards.fetch();
    var lastPos = cards[0];
    if (lastPos === null || lastPos === undefined) {
        Cards.update({
            _id: cardId
        }, {
            $set: {
                position: 0,
                category: newCardCategory
            }
        });
    } else {
        Cards.update({
            _id: cardId
        }, {
            $set: {
                position: parseInt(lastPos.position) + 1,
                category: newCardCategory
            }
        });
    }
};

CardMethods.UpdatePosition = function(cardId, currPosition, currCategory, newCardCategory, siblingPos) {
    var roomCode = Cards.findOne({
        _id: cardId
    }).roomCode;
    //decrement existing cards by one in currCategory
    Cards.update({
        $and: [{
            roomCode: roomCode
        }, {
            category: currCategory
        }, {
            position: {
                $gt: currPosition
            }
        }]
    }, {
        $inc: {
            position: -1
        }
    }, {
        multi: true
    });

    //increment new category cards by 1
    Cards.update({
        $and: [{
            roomCode: roomCode
        }, {
            category: newCardCategory
        }, {
            position: {
                $gt: siblingPos
            }
        }]
    }, {
        $inc: {
            position: 1
        }
    }, {
        multi: true
    });

    Cards.update({
        _id: cardId
    }, {
        $set: {
            position: siblingPos + 1,
            category: newCardCategory
        }
    });
};
