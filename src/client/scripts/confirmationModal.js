/* global Popup:false */
Template.confirmationModal.helpers({
    confirmationAction : function(){
        return Session.get("ConfirmationModalAction");
    }
});

Template.confirmationModal.events({
    "click #confirmationModalAccept": function(){
        Popup.CallbackAcceptAction();
        Popup.ResetCallbackFunctions();
    },

    "click .confirmationModalCancel": function(){
        Popup.CallbackCancelAction();
        Popup.ResetCallbackFunctions();
    }
});
