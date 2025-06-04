public with sharing class caseRecords {
    @AuraEnabled(cacheable=true)
   public static List<case> getcases(){
    return [SELECT id, CaseNumber,OwnerId FROM case LIMIT 5];
   }
}