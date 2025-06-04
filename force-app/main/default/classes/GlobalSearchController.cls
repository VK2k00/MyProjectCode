public with sharing class GlobalSearchController {
    
    @AuraEnabled(cacheable=true)
    public static List<sObject> searchGlobal(String searchTerm) {
        if (String.isBlank(searchTerm)) {
            return new List<sObject>();
        }
        
        String query = '%' + searchTerm + '%';
        
        List<Account> accountList = [
            SELECT Id, Name, AccountNumber FROM Account
            WHERE Name LIKE :query
            LIMIT 50
        ];
        
        List<Contact> contactList = [
            SELECT Id, FirstName, LastName, Email FROM Contact
            WHERE FirstName LIKE :query OR LastName LIKE :query
            LIMIT 50
        ];
        
        // Combine both results
        List<sObject> results = new List<sObject>();
        results.addAll(accountList);
        results.addAll(contactList);
        
        return results;
    }
}