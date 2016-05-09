/*eslint-disable*/
Users = new Mongo.Collection.get("users");
if (Meteor.isServer) {
    Meteor.publish("users", function(){
      return Users.find({_id:this.userId});
    });
}else {
  Meteor.subscribe("users");
}
UserMethods = {};

UserMethods.getUserImage = function(user){
  var userImage = Users.findOne({_id:user}).services.google.picture;
  return userImage;
};

UserMethods.getAuthor = function(){
  return Meteor.user() ? Meteor.user().profile.name:Session.get("author");
};
