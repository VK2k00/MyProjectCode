trigger AccountTrigger on Account (before insert, after insert) {
    if(trigger.isInsert){
        if(trigger.isBefore){
            AccountTriggerHandler.AccTriger(trigger.new);
        
    }
        else if(trigger.isAfter){
             AccountTriggerHandler.AccOpp(trigger.new);
        }
    }
 
   
}