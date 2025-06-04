@isTest
public class AccountCopyEmailAdressHandlerTest {
    @isTest
    Public static void AdressCopy(){
       List<Account>Aclist=new List<Account>();
         Account ac=new Account();
        ac.Name='test';
        ac.BillingCity='Banglore';
        ac.BillingCountry='india';
        ac.BillingPostalCode='68617';
        ac.BillingStreet='Banglore';
        ac.CopyBillingToShipping__c= true;
        Aclist.add(ac);
        
     test.startTest();
    insert Aclist;
    test.stopTest();
      

    }
   
    
    

}