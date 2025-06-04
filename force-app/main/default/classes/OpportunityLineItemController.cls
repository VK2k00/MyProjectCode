// OpportunityLineItemController.cls
public class OpportunityLineItemController {
    @AuraEnabled
    public static OpportunityLineItem saveLineItem(OpportunityLineItem oppLineItem) {
        // Perform save operation
        upsert oppLineItem;
        return oppLineItem;
    }

    @AuraEnabled
    public static void deleteLineItem(OpportunityLineItem oppLineItem) {
        // Perform delete operation
        delete oppLineItem;
    }
}