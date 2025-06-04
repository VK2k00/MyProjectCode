trigger UpdateAccountOpportunityAmount on Opportunity (after insert, after update, after delete) {
    // Create a set to store the Account Ids that need to be updated
    Set<Id> accountIdsToUpdate = new Set<Id>();

    // Collect Account Ids from the trigger context
    if (Trigger.isInsert || Trigger.isUpdate) {
        for (Opportunity opp : Trigger.new) {
            if (opp.AccountId != null) {
                accountIdsToUpdate.add(opp.AccountId);
            }
        }
    }
    
    if (Trigger.isDelete) {
        for (Opportunity opp : Trigger.old) {
            if (opp.AccountId != null) {
                accountIdsToUpdate.add(opp.AccountId);
            }
        }
    }

    // Query the Opportunities for the related Account and calculate the total amount
    List<Account> accountsToUpdate = new List<Account>();
    for (Account acc : [SELECT Id, Custom_Opportunity_Amount__c, (SELECT Amount FROM Opportunities) 
                         FROM Account 
                         WHERE Id IN :accountIdsToUpdate]) {
        Decimal totalAmount = 0;
        for (Opportunity opp : acc.Opportunities) {
            totalAmount += opp.Amount != null ? opp.Amount : 0;
        }
        
        // Update the custom field with the total amount
        acc.Custom_Opportunity_Amount__c = totalAmount;
        accountsToUpdate.add(acc);
    }

    // Update the Account records with the new total amount
    if (!accountsToUpdate.isEmpty()) {
        update accountsToUpdate;
    }
}