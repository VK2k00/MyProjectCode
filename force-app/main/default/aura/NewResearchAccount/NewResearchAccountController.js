// Controller.js
({
    doInit : function(component, event, helper) {
        var action = component.get("c.getRecordTypeId");
        action.setParams({
            "recordTypeName": "Research_Account"
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.recordTypeId", response.getReturnValue());
            } else {
                console.error("Failed to fetch record type ID");
            }
        });
        $A.enqueueAction(action);
    },
    handleSuccess : function(component, event, helper) {
        var recordId = event.getParam("id");
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": recordId,
            "slideDevName": "detail"
        });
        navEvt.fire();
    },
    handleError : function(component, event, helper) {
        console.error("An error occurred");
    }
})