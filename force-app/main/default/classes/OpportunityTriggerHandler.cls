public class OpportunityTriggerHandler {
    
    public static void Opportunityteamupdate(list<Opportunity>oplist, map<id,opportunity>oldmap){
        
        list<OpportunityTeamMember> teammember= new list<OpportunityTeamMember>();
        list<user> opportunities = [select id, userRole.Name from user where isActive= true AND userRole.Name='SVP, Human Resources'];
        for(opportunity opp:oplist){
            for(user userRec :opportunities ){
            if(opp.StageName=='Id. Decision Makers' && opp.StageName!=oldmap.get(opp.Id).StageName){
                OpportunityTeamMember oppteamMember = new OpportunityTeamMember();
                oppteamMember.OpportunityId=opp.Id;
                oppteamMember.OpportunityAccessLevel='Edit';
                oppteamMember.UserId=userRec.id;
                teammember.add(oppteamMember);
            }
                
            }
        }
        if(!teammember.isEmpty()){
            insert teammember;
        }
    }
    
    public static void OpportunityTrigr(list<Opportunity>ooplist){
        
        List<Account> acclist= new List<Account>();
        for(opportunity oop:ooplist){
            if(oop.Amount !=null || oop.AccountId !=null){
                Account ac=new Account();
                ac.Id=oop.AccountId;
                ac.Latest_Opportunity_Amount__c=oop.Amount;
                acclist.add(ac);
                }
        }
        if(!acclist.isEmpty()){
            update acclist;
        }
          }
    
    
    public static void OpportunityTrig(list<opportunity>opplist){
        
        for(Opportunity opp:opplist){
            if(opp.Amount >=100000 && opp.Amount <=5000000 ){
                opp.Description='Hot Opportunity';           
                                            }
            else{
                opp.Description='';
                
            }
        }
            
           
    }
}