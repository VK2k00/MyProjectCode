public with sharing class opportunityRecords {
    @AuraEnabled(cacheable=true)
    public static List<opportunity> getOpportunity (){
        return [SELECT Id, Name, AccountId FROM opportunity WHERE Name!=null LIMIT 5];
    }

    }