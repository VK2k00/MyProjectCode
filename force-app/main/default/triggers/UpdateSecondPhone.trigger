trigger UpdateSecondPhone on Account (before insert) {
    for (Account acc : Trigger.new) {
       
        if (acc.Phone != null) {

            String[] phoneValues = acc.Phone.split(',');
            
            if (phoneValues.size() >= 2) {
                acc.Phone = phoneValues[0].trim();
                
                 acc.Phone2__c = phoneValues[1].trim();
            }
      
        }
        
        
    }
    
}