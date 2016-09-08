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
    this.avatar = "";
};

Comment.prototype.createdBy = function(author){
    this.author = author;
    if(author.services)
        this.hasImage = true;
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

Comment.prototype.withAvatar = function(avatar){
    this.avatar = avatar;
    return this;
};
