/*eslint-disable*/
(function (Meteor, Tracker, Router) {
  var isRouterReady = false;
  var callbacks = [];

  window.waitForRouter = function (callback) {
    if (isRouterReady) {
      callback();
    } else {
      callbacks.push(callback);
    }
  };

  Router.onAfterAction(function () {
    if (!isRouterReady && this.ready()) {
      Tracker.afterFlush(function () {
        isRouterReady = true;
        callbacks.forEach(function (callback) {
          callback();
        });
        callbacks = []
      })
    }
  });

  Router.onRerun(function () {
    isRouterReady = false;
    this.next();
  });

  Router.onStop(function () {
    isRouterReady = false;
    if (this.next) {
      this.next();
    }
  });
})(Meteor, Tracker, Router);

function waitForElement(selector, successCallback) {
  var checkInterval = 50;
  var timeoutInterval = jasmine.DEFAULT_TIMEOUT_INTERVAL;
  var startTime = Date.now();
  var intervalId = Meteor.setInterval(function () {
    if (Date.now() > startTime + timeoutInterval) {
      Meteor.clearInterval(intervalId);
      // Jasmine will handle the test timeout error
    } else if ($(selector).length > 0) {
      Meteor.clearInterval(intervalId);
      successCallback();
    }
  }, checkInterval);
}
