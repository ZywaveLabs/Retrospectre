/* global Log: true */

Log = function(message){ // eslint-disable-line
    if(message === undefined)
        message = "";
    this.message = message;
    this.userId = Meteor.userId();
    this.createdAt = new Date();
    this.info = {};
};

Log.prototype.withMessage = function (message) {
    this.message = message;
    return this;
};

Log.prototype.createdBy = function (userId) {
    this.userId = userId;
    return this;
};

Log.prototype.createdAt = function (dateTime) {
    this.createdAt = dateTime;
    return this;
};

Log.prototype.withInfo = function (info) {
    this.info = info;
    return this;
};

Log.prototype.addInfo = function (key, info) {
    this.info[key] = info;
    return this;
};
