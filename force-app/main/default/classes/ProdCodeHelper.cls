public class ProdCodeHelper {
    public static  boolean firstRun = true;
    public static void insertOrderProduct(Map<Id,Quote> triggernewMap,Map<Id,Quote> triggeroldMap)
    {
        List<Order> ordList = new List<Order>();
        Set<Id> acceptedQuotes= new Set<Id>();
        for(Quote q : triggernewMap.values()){
            if(q.Status == 'Accepted' && q.Status != triggeroldMap.get(q.Id).Status){
                acceptedQuotes.add(q.Id);
                Order o = new Order(AccountId = q.AccountId , QuoteId = q.Id, Pricebook2Id = q.Pricebook2Id, status = 'Draft',
                /*BillingAddress = q.BillingAddress , ShippingAddress = q.ShippingAddress,*/ EffectiveDate = Date.today());
                ordList.add(o);
            }
        }
        if(!ordList.isEmpty()){
            Database.insert(ordList,false);
        }
        Map<String,String> ordQuoteMap= new Map<String,String>();
        List<OrderItem> oiList = new List<OrderItem>();
        Map<Id,QuoteLineItem> qliMap = new Map<Id,QuoteLineItem>([SELECT Id,QuoteId,Product2Id,PricebookEntryId,Quantity,TotalPrice FROM QuoteLineItem WHERE QuoteId IN :acceptedQuotes]);
        for(Order o : ordList){
            ordQuoteMap.put(o.QuoteId, o.Id);
        }
        if(!qliMap.values().isEmpty()){
            for(QuoteLineItem ql : qliMap.values()){
                System.debug('Hello');
                OrderItem oi = new OrderItem(OrderId = ordQuoteMap.get(ql.QuoteId) , Product2Id = ql.Product2Id , PricebookEntryId = ql.PricebookEntryId,
                QuoteLineItemId = ql.Id , Quantity = ql.Quantity, UnitPrice = ql.TotalPrice);
                oiList.add(oi);
            }
        }
        if(!oiList.isEmpty()){
            Database.insert(oiList,false);
        }
    }
}