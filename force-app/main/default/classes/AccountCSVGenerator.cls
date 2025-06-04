public with sharing class AccountCSVGenerator {
    @AuraEnabled(cacheable=true)
    public static String generateCSV() {
        List<Account> accounts = [SELECT Id, Name, Industry, Phone, BillingCity FROM Account]; // Limiting to 100 records for example
        
        String csvFile = 'Name,Industry,Phone,BillingCity\n'; // CSV header
        
        for(Account acc : accounts) {
            csvFile += '"' + acc.Name + '","' + acc.Industry + '","' + acc.Phone + '","' + acc.BillingCity + '"\n';
        }
        
        return csvFile;
    }
}