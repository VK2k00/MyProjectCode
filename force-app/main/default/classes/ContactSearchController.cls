public with sharing class ContactSearchController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchTerm) {
        // Perform SOQL query to fetch contacts based on searchTerm
        String query = 'SELECT Id, Name, Email, Phone FROM Contact WHERE Name LIKE \'%' + String.escapeSingleQuotes(searchTerm) + '%\' LIMIT 10';
        return Database.query(query);
    }
}