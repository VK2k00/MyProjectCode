global class RemindOppOwners implements Schedulable{
    
    global void execute(SchedulableContext cxt){
        
        List<Opportunity> opplist=[SELECT id,Name,OwnerId,CloseDate FROM Opportunity
                                   WHERE 
                                   IsClosed=False And CloseDate<TODAY];
        taskUtils.RemindOwners(opplist);
    }

}