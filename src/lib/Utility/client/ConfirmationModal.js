/* eslint-disable */
/* global Popup:true */

Popup = {};
Popup.CallbackAcceptAction = function(){};
Popup.CallbackCancelAction = function(){};
Session.set("ConfirmationModalAction","");

Popup.ResetCallbackFunctions = function(){
    // Waiting for the modal to actually close before clearing text, or else it looks kinda funny
    $("#confirmation-modal").on('hidden.bs.modal', function (e) {
        Session.set("ConfirmationModalAction","");
        $("#confirmation-modal").off();
    });
    $("#confirmation-modal").modal("hide");
    Popup.CallbackAcceptAction = function(){};
    Popup.CallbackCancelAction = function(){};
}

Popup.Confirm = function(actionName, callbackAccept, callbackCancel){
    Session.set("ConfirmationModalAction", actionName);
    if(typeof callbackAccept === "function")
        Popup.CallbackAcceptAction = callbackAccept;
    if(typeof callbackCancel === "function")
        Popup.CallbackCancelAction = callbackCancel;
    $("#confirmation-modal").modal();
};
