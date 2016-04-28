/* eslint-disable */
/* global DEFAULT_SNACKBAR_TIMEOUT:true */
SnackbarMethods = {};

DEFAULT_SNACKBAR_TIMEOUT = 3000;

SnackbarMethods.DisplayMessage = function(message, timeout, error) {
    var options =  {
        content: message,
        style: "snackbar",
        timeout: timeout
    };

    $.snackbar(options);
    if(error){
        console.log(error);
    }
}
