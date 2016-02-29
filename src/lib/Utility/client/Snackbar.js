/* eslint-disable */
SnackbarMethods = {};

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
