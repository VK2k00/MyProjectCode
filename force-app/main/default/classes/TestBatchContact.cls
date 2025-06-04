@isTest
public class TestBatchContact {
    @isTest
    private Static void ConBatch(){
        list<contact> conlist=new list<contact>();
        for(integer i=0;i<200;i++){
            conlist.add(new contact(LastName='Test'+i, LeadSource='Phone Inquiry', Email='Gyansys@gyansysm.com'));
            
        }
        insert conlist;
        
        test.startTest();
        BatchContact co=new BatchContact();
        id batchId=Database.executeBatch(co,200);
        test.stopTest();
        

        
    }

}