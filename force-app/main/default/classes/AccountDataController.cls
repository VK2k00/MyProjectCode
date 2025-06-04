public with sharing class AccountDataController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccount() {
        return [SELECT Id, Name FROM Account LIMIT 10];
    }
    

    @AuraEnabled(cacheable=true)
    public static list<Contact> getContact(String accId){
return [SELECT id,Name,Email,AccountId,Account.Name from Contact WHERE AccountId=:accId];
    } 
    
}