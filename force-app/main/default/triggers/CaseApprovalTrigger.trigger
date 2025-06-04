trigger CaseApprovalTrigger on Case (after update) {
    List<case> caselist=new List<case>();
    set<id> statusid= new set<id>();
        
    List<ProcessInstance> processins=[SELECT Id ,LastActorId,(SELECT Id, ProcessNodeId,ProcessInstanceId,Comments,StepStatus,TargetObjectId,ActorId FROM StepsAndWorkitems )
FROM ProcessInstance];
    for(ProcessInstance pI:processins){
        
        statusid.add(pI.LastActorId);
    }
    User ur=[select id FROM User where id=:statusid ];
    for(case cs:caselist){
        cs.Approver_User__c=ur.Id;
       System.debug('user'+ur.id);
       caselist.add(cs);
    }
    update caselist;
   
}