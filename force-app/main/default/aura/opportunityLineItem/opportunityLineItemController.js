// opportunityLineItemEditDeleteController.js
({
    init : function(component, event, helper) {
        // Initialize Opportunity Line Item record
        var oppLineItem = component.get("v.oppLineItem");
        if (!oppLineItem) {
            oppLineItem = {
                sobjectType: "OpportunityLineItem",
                OpportunityId: component.get("v.recordId") // Assuming recordId is passed to the component
            };
            component.set("v.oppLineItem", oppLineItem);
        }
    },

    toggleEdit : function(component, event, helper) {
        // Toggle between edit mode and display mode
        var isEditing = component.get("v.isEditing");
        component.set("v.isEditing", !isEditing);
    },

    saveLineItem : function(component, event, helper) {
        var oppLineItem = component.get("v.oppLineItem");
        var action = component.get("c.saveLineItem");
        action.setParams({ oppLineItem: oppLineItem });
        action.setCallback(this, function(response) {
            // Handle response here
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.isEditing", false);
            }
        });
        $A.enqueueAction(action);
    },

    deleteLineItem : function(component, event, helper) {
        var oppLineItem = component.get("v.oppLineItem");
        var action = component.get("c.deleteLineItem");
        action.setParams({ oppLineItem: oppLineItem });
        action.setCallback(this, function(response) {
            // Handle response here
            var state = response.getState();
            if (state === "SUCCESS") {
                // Perform any additional actions after successful deletion
            }
        });
        $A.enqueueAction(action);
    }
})