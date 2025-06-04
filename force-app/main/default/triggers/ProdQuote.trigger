trigger ProdQuote on Quote (after update) {
    
    if(Trigger.isAfter && Trigger.isUpdate)
    {
        //ProdCodeHelper.firstRun = false;
        ProdCodeHelper.insertOrderProduct(Trigger.newMap,Trigger.oldMap);
    }
    
}