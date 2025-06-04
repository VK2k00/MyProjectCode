public inherited sharing class DescribeObjectHelper {
    //Retrieve all the objects from org
    @AuraEnabled (cacheable=true)
    public static List<EntityDefinition> retreieveObjects(){
        return [SELECT Id, MasterLabel,  
                    DeveloperName, 
                    QualifiedApiName 
                    FROM EntityDefinition 
                    WHERE IsApexTriggerable = true
                    ORDER BY MasterLabel];
    }

    //Retrieve field details based on Object API Name
    @AuraEnabled (cacheable=true)
    public static String getListOfFields(String objectAPIName){
        Map<string, string> fieldList = new Map<string, string>();
        if(!String.isEmpty(objectAPIName)){
            Map<String, String> mapField = new Map<String, String>();
            Map<string,SObjectField> lstFields = 
                schema.getGlobalDescribe().get(objectAPIName).getDescribe().fields.getMap();

            for(String str: lstFields.keySet()){
                mapField.put(str, lstFields.get(str).getDescribe().getLabel());                
            }
            System.debug(JSON.serializePretty(mapField));
            return JSON.serializePretty(mapField);
        }
        return null;
    }

    //Retrieve records based on selected fields and object.
    @AuraEnabled (cacheable=true)
    public static List<SObject> retreieveRecords(String objectName, String fieldAPINames){
        String strQuery = 'SELECT ' + String.escapeSingleQuotes(fieldAPINames) 
                        + ' FROM ' 
                        + String.escapeSingleQuotes(objectName) 
                        + ' LIMIT 20';
        return database.query(strQuery);
    }
}