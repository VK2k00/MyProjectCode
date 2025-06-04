public with sharing class MangoMapController {
   
    @AuraEnabled(cacheable=true)
    public static List<String> getObjects(){
        List<string> sObjectList = new List<string>();
        for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()){
            String name = objTyp.getDescribe().getName();
            if((name != 'Map_Objects__c')){
                SobjectList.add(name);
            }
        }
        return sObjectList;
    }
}