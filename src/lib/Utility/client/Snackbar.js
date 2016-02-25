/* eslint-disable */
SnackbarMethods = {};

SnackbarMethods.DisplayMessage = function(message, timeout) {
    var options =  {
        content: message,
        style: "snackbar",
        timeout: timeout
    };

    $.snackbar(options);
}
