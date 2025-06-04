public with sharing class CouponCampaignController {
    @AuraEnabled(cacheable=true)
    public static Coupon_Campaign__c getActiveCampaign() {
        User currentUser = [SELECT Id, UserType FROM User WHERE Id = :UserInfo.getUserId()];

        if (currentUser.UserType == 'Standard' || currentUser.UserType == 'StandardPerson') {
            List<Coupon_Campaign__c> campaigns = [
                SELECT Id, Header_Text_Block__c, End_Date__c 
                FROM Coupon_Campaign__c 
                WHERE Active__c = true 
                AND End_Date__c != null 
                ORDER BY End_Date__c ASC 
                LIMIT 1
            ];
            if (!campaigns.isEmpty()) {
                return campaigns[0];
            }
        }
        return null;
    }
}