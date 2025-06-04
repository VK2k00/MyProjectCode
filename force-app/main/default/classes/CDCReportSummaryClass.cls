public with sharing class CDCReportSummaryClass {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(Integer pageNumber, Integer pageSize) {
        Integer offsetValue = (pageNumber - 1) * pageSize;
        return [
            SELECT Id, Name, Record_Summary__c 
            FROM Account 
            ORDER BY Name 
            LIMIT :pageSize OFFSET :offsetValue
        ];
    }

    @AuraEnabled
    public static String updateAccountSummary(Id recordId, String summary) {
        try {
            Account acc = new Account(Id = recordId, Record_Summary__c = summary);
            update acc;
            return 'Success';
        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
}