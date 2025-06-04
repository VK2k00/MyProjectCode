public class dailyOppProcesser implements Schedulable{
    public void execute(SchedulableContext ctx){
        list<Opportunity>opplist=[SELECT Id,LeadSource FROM opportunity WHERE LeadSource = null LIMIT 200];
        
        For( Opportunity opp:opplist){
            opp.LeadSource='Phone Inquiry';
            
        }
        if(!opplist.isEmpty()){
            update opplist;
        }
    }

}