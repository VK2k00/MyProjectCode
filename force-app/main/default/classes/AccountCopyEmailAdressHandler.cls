public class AccountCopyEmailAdressHandler {
    public static void copyEmail(list<Account>Aclist){
        For(Account Ac:Aclist) {
            if(Ac.CopyBillingToShipping__c==true){
                Ac.ShippingCity = Ac.BillingCity;
                Ac.ShippingCountry= Ac.BillingCountry;
                Ac.ShippingStreet= Ac.BillingStreet;
                Ac.ShippingPostalCode=Ac.BillingPostalCode;
            }
        }
           
        
    }

}