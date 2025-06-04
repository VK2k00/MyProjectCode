public class BatchContact implements Database.batchable<sObject>, Database.Stateful {
    public integer recordCount=0;
    
    public Database.QueryLocator Start(Database.BatchableContext bc){
        return Database.getQueryLocator([SELECT id,LeadSource,Email FROM Contact]);
    }
    Public void Execute(Database.BatchableContext bc, List<Contact>conlist){
        for(contact con:conlist){
            con.LeadSource='Phone Inquiry';
            con.Email='Gyansys@gyansysm.com';
            
        }
        update conlist;
        recordCount= recordCount + conlist.size();
    }
    Public Void Finish(Database.BatchableContext bc){
        system.debug('Count Records'+ recordCount);
        
    }
        
       

}