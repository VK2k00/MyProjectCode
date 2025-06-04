public with sharing class AccountController {

@AuraEnabled (cacheable=true)
public static List<Account> getAccounts(){
   return [SELECT id, name, Phone, Industry from account Limit 10];
}

    }