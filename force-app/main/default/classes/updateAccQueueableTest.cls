@isTest
public class updateAccQueueableTest {
    @testSetup
    Static void setup(){
        list<account> aclist=new list<account>();
        aclist.add(new Account(Name='parent'));
    
    for(integer i=0;i<100;i++){
        aclist.add(new Account(Name='testAcc'+i));
    }
insert aclist;
    }
@isTest
Private static void TestQueueable(){
    Id ParentsId=[SELECT id FROM Account WHERE Name='parent'][0].Id;
    
    list<account> acclist= [SELECT id,Name FROM Account Where Name Like 'testAcc%'];
    updateAccQueueable updatejob=new updateAccQueueable(acclist,ParentsId);
    
    test.startTest();
    system.enqueueJob(updatejob);
    test.stopTest();
    
    system.assertEquals(100,[SELECT Count() FROM Account WHERE ParentId=:ParentsId]);
}
}