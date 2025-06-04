@isTest
public class OpportunityTriggerHandlerTest {
   @isTest 
    Public Static void OppAmount(){
        list <opportunity> oplist =new list<opportunity>();
        list<Account> acclist=new list<Account>();
        
        Account Acc=new Account();
        Acc.Name='test';
        acclist.add(Acc);
        insert acclist;
        
   
            Opportunity oppo=new Opportunity();
            oppo.Name='ac.Name';
            oppo.AccountId=acclist[0].id;
            oppo.StageName='Prospecting';
            oppo.CloseDate=system.today();
            oppo.Amount=600000;
            oplist.add(oppo);
             
        test.startTest();
        insert oplist;
        test.stopTest();
           
       
    
    }
    
    
    
    @isTest 
        public static void OppDiscription(){
        list<Opportunity> opplists= new list<Opportunity>();
         list<Account> acclist=new list<Account>();
        
        Account Acc=new Account();
        Acc.Name='test';
        acclist.add(Acc);
        insert acclist;
            opportunity opp=new opportunity();
        opp.AccountId=acclist[0].id;
            opp.Name='test';
            opp.Amount=100000;
            opp.CloseDate= system.today();
            opp.StageName='Prospecting';
            opp.Description='Hot Opportunity';
            opplists.add(opp);
              insert opp;
            
            opportunity op=new opportunity();
        op.AccountId=acclist[0].id;
            op.Name='test2';
            op.Amount=100;
            op.CloseDate= system.today();
            op.StageName='Prospecting';
            op.Description='Hot Opportunity';
            opplists.add(op);
            
            
         test.startTest();
        insert op;
        test.stopTest();
        
        list<Opportunity> oppolists=[SELECT id,Description from Opportunity WHERE Id=:opplists[0].id];
        system.assertEquals('Hot Opportunity', oppolists[0].Description);
        
}

}