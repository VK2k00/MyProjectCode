public class AccountSalesRepOwnClass {
    public static void salesRepMethod(list<account>newdata){
        set<id> accid= new set<id>();
        
        for(Account ac:newdata){
            accid.add(ac.OwnerId);
                   }
        
        Map <id,User> Mapuser = new Map <id,User>([SELECt Name FROM User WHERE Id IN:accid]);
 for(Account Acc :newdata )
 {
     User usr= Mapuser.get(Acc.OwnerId);
     Acc.Sales_Rep__c= usr.Name;
     
   
    }
  } 
}