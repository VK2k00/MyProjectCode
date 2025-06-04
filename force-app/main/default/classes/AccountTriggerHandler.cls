public class AccountTriggerHandler {
    
    public static void AccOpp(list<Account>AcList){
        List<Opportunity> opplist=new List<Opportunity>();
        
        For(Account Acco:AcList){
            opportunity opp =new opportunity();
            
            opp.AccountId=Acco.Id;
            opp.Name=Acco.Name;
            opp.StageName='Prospecting';
            opp.CloseDate=system.today();
            opplist.add(opp);
            
        }
        insert opplist;
        
    }   
    
    
    public static void AccTriger (list<Account>Acclist){    
        for(Account Ac:Acclist){
            if(Ac.Industry=='Media' || Ac.Industry=='Energy'){
                Ac.Rating='Hot';
                
            }
        }
        
    }
}