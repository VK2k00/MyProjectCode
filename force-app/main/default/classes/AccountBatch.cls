public class AccountBatch implements Database.Batchable<sObject>, Database.Stateful{
    public integer  recCount=0;
    
    public Database.QueryLocator start(Database.BatchableContext bc){
        return Database.getQueryLocator([SELECT id,Name,Type FROM Account]); 
    }
    public void execute(Database.BatchableContext bc, List <Account> acclist){
        for(Account ac:acclist){
            ac.type='Customer - Direct';
           
        }
        update acclist;
        recCount=recCount + acclist.size();
        
    }
    
    public void finish(Database.BatchableContext bc){
        system.debug('Record count'+recCount);
    }
    

}