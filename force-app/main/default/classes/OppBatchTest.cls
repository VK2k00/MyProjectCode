@isTest
public class OppBatchTest {
    @isTest
    Private Static void Batchtest(){
        List<Opportunity> Opplist=new List<Opportunity>();
        
        for (integer i=0;i<200;i++){
            Opplist.add(new opportunity (Name='Test'+i, StageName='Prospecting', CloseDate=system.today()));
            
        }
        insert Opplist;
        
        test.startTest();
         Oppbatch oppb=new Oppbatch();
        id batchId=database.executeBatch(oppb,200);
            test.stopTest();
        
        list<opportunity> oppupdate=[SELECT id from Opportunity WHERE LeadSource='web'];
        system.assertEquals(200, oppupdate.size());
            
    }
}