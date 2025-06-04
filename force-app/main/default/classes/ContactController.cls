public with sharing class ContactController {

    @AuraEnabled(cacheable=true)
    public static List<Contact> searchContacts(String searchTerm) {
        String searchPattern = '%' + searchTerm + '%';
        return [
            SELECT Id, Name, Email, Phone
            FROM Contact
            WHERE Name LIKE :searchPattern
            LIMIT 50
        ];
    }
}