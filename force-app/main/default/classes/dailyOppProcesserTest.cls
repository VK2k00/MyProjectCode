@isTest
public class dailyOppProcesserTest {
    @isTest
    Private static void testsheduledApex(){
        List<opportunity> oppList= new List<opportunity>();
            String sch = '0 0 0 ? * * *';
        for(integer i=0;i<500;i++){
            if(i<250){
                opplist.add(new Opportunity(Name='test'+i,StageName='Id. Decision Makers',Closedate= System.today()));  
            }else
            {
                opplist.add(new Opportunity(Name='test'+i,StageName='Id. Decision Makers',Closedate= System.today(),LeadSource='Other'));
            }
            
        }
        Insert oppList;
        
        test.startTest();
        String jobId= System.Schedule('process Opportunity',sch, new dailyOppProcesser());
        test.stopTest();
        
        List<opportunity> oplist=[SELECT id,LeadSource FROM Opportunity WHERE LeadSource='Phone Inquiry'];
        system.assertEquals(200, oplist.size());
            
    }

}