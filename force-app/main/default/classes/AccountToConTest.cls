@isTest
public class AccountToConTest {
    @isTest 
    Public Static Void AccToCon(){
       List<Account>AcoList= new List<Account>();
        Account acco= new Account();
        acco.Name='Testing';
        AcoList.add(acco);
        test.startTest();
        insert AcoList;
        test.stopTest();
        
        List<Contact>conList= new List<Contact>();
         Contact acc= new Contact();
        acc.LastName=acco.Name;
        conList.add(acc);
        test.startTest();
        insert conList;
        test.stopTest();
    }

}