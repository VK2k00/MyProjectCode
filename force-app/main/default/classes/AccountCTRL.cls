public with sharing class AccountCTRL {
    @AuraEnabled
    public static Id getRecordTypeId(String recordTypeName) {
        Schema.RecordTypeInfo recordTypeInfo = Schema.SObjectType.Account.getRecordTypeInfosByName().get(recordTypeName);
        if (recordTypeInfo != null) {
            return recordTypeInfo.getRecordTypeId();
        } else {
            throw new AuraHandledException('No such record type found');
        }
    }
}