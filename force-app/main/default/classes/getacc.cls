public with sharing class getacc {
    @AuraEnabled(cacheable=true)
   public static List<Contact> getAccounts() {
       return [SELECT Id, LastName,Account.Name
               FROM Contact Where AccountId!=null
               ORDER BY Name 
               LIMIT 10];
}}