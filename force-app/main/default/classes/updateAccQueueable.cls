public class updateAccQueueable implements Queueable {
    
    Private list<account> Acclist;
    Private Id ParentaccId;
    
    public updateAccQueueable (list<Account>ac, Id id){
        this.Acclist= ac;
        this.ParentaccId= id;  
    }
    public void execute(QueueableContext context){
        
        for(Account Acc:Acclist){
            acc.ParentId=ParentaccId;
        }
        update Acclist;
        
    }
}