public with sharing class getContacts {
    @AuraEnabled(cacheable=true)
    public static List<contact> getContactList(){
    return [SELECT Id, FirstName, LastName, Email FROM contact WHERE FirstName!=null  LIMIT 5 ];
    }
}