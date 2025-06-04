public with sharing class AccountContactsController {
    @AuraEnabled(cacheable=true)
    public static List<AccountContactWrapper> getAccountWithContacts() {
        // Fetch Accounts and related Contacts
        List<Account> accounts = [SELECT Id, Name, (SELECT Id, FirstName, LastName, Email FROM Contacts) FROM Account];
        
        List<AccountContactWrapper> result = new List<AccountContactWrapper>();
        
        for (Account acc : accounts) {
            for (Contact con : acc.Contacts) {
                // Create a wrapper object for each Contact and associated Account
                AccountContactWrapper wrapper = new AccountContactWrapper();
                wrapper.accountName = acc.Name;
                wrapper.contactName = con.FirstName + ' ' + con.LastName;
                wrapper.contactEmail = con.Email;
                wrapper.accountId = acc.Id;
                result.add(wrapper);
            }
        }
        
        return result;
    }

    public class AccountContactWrapper {
        @AuraEnabled public String accountName;
        @AuraEnabled public String contactName;
        @AuraEnabled public String contactEmail;
        @AuraEnabled public String accountId;
    }
}