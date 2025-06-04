public class OppBatch implements Database.Batchable<sObject>, Database.stateful {
    Public integer recordCount = 0;
    
    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator([SELECT id,Name FROM Opportunity]);
        
    }
    public void execute(Database.BatchableContext bc, List <Opportunity> opps){
        for(opportunity op: opps){
            op.StageName= 'Value Proposition';
            op.LeadSource='web';

        }
        update opps;
        recordCount=recordCount + opps.size();
        
    }
 public void finish(Database.BatchableContext bc){
     system.debug('total record Proceed'+recordcount);
        
    }
}