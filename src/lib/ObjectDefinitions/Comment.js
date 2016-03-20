/* global Comment:true */

/*
CommentObject
author - {string} - UserId
text - {string} - Comment
createdAt - {datetime} - Created at time
image - {string} - profileImage
*/
Comment = function(){
    this.author = "";
    this.text = "";
    this.createdAt = new Date();
    this.image = "";
};

Comment.prototype.createdBy = function(author){
    this.author = author;
    return this;
};

Comment.prototype.withText = function(text){
    this.text = text;
    return this;
};

Comment.prototype.createdAtTime = function(createdAt){
    this.createdAt = createdAt;
    return this;
};

Comment.prototype.withAvatar = function(image) {
    this.image = image;
    return this;
};
