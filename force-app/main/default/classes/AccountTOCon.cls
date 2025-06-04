public class AccountTOCon {
    public static void AccountTOConmethod(List<Account>oldData){
        for(Account ac:oldData){
            Contact co=new Contact(
            AccountId=ac.Id,
                LastName=ac.Name
            );
            insert co;
           

        }
        
   }
}