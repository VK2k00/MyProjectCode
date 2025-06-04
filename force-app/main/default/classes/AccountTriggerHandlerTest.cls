@isTest 
public class AccountTriggerHandlerTest {
    @isTest
    public static void reletedOppTest(){
      
       List<Account> Act = new List<account>();
        Account At=new Account();
        At.Name='test';
        Act.add(At);
        
        Test.startTest();
        insert Act;
        Test.stopTest();
      
    }
    
    
    
    
    
    
    
    @isTest
    public static void updateRating(){
        list<Account> acc = new list<Account>();
        for(integer i=1;i<=5;i++){
           Account Accc=new Account();
            Accc.Name='test'+i;
            Accc.Industry='Energy';
            Accc.Rating='Hot';
            acc.add(Accc);
        }
        test.startTest();
        insert acc;
        test.stopTest();
        
        list<Account> Acclists=[SELECT id,Rating from Account WHERE Id=:acc[0].id];
        system.assertEquals('Hot', Acclists[0].Rating);
        
    }

}