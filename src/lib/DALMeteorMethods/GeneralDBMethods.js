/*eslint-disable*/
Users = new Mongo.Collection.get("users");

if(Meteor.isServer){
    Meteor.publish("users", function(){
        return Users.find({});
    });
} else {
    Meteor.subscribe("users");
}

UserMethods = {};

UserMethods.getUserImage = function(user){
  var users = Mongo.Collection.get("users");
  var userImage = users.findOne({_id:user}).services.google.picture;
  return userImage;
};
Meteor.methods({
  getUserImage: function(user){
    return UserMethods.getUserImage(user);
  }
});
