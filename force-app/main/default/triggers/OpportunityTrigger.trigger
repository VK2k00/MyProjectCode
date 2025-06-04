trigger OpportunityTrigger on Opportunity (before insert, before update,After Insert,After Update) {
    If(trigger.isInsert || trigger.isInsert || trigger.isUpdate ){
        if(trigger.isBefore){
            OpportunityTriggerHandler.OpportunityTrig(trigger.new);
        } else if(trigger.isAfter){
            OpportunityTriggerHandler.OpportunityTrigr(trigger.new);
            OpportunityTriggerHandler.Opportunityteamupdate(trigger.new, trigger.oldMap);

            
        } 
        
    }

}