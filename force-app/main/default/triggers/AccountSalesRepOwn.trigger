trigger AccountSalesRepOwn on Account (before insert, before update) {
    if(Trigger.isBefore && Trigger.isUpdate || Trigger.isBefore && Trigger.isInsert)
    {
AccountSalesRepOwnClass.salesRepMethod(trigger.new);
    }

}