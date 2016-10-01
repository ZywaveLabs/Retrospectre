/* global Logger:false */

Meteor.methods({ // eslint-disable-line
    log: function (logObject) {
        Logger.Log(logObject);
    }
});
