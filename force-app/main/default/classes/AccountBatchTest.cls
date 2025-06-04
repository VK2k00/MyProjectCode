@isTest
public class AccountBatchTest {
    @isTest
    Private static void testbatch(){
        List<Account> acclist = new List<Account>();
        
        for(integer i=0;i<200;i++){
            acclist.add(new Account(Name='VkTest'+i,Phone='9934567089'));
           
        }
        
        insert acclist;
        
        test.startTest();
        AccountBatch ac=new AccountBatch();
        id batchId=database.executeBatch(ac,200);
        test.stopTest();
        
         list<Account> accupdate=[SELECT id from Account WHERE type='Customer - Direct'];
        system.assertEquals(200, accupdate.size());
        
    }

}