public class ContactToConRelCls {
    public static void contactrel(list<Contact>conNew){
        
     list<Contact_Relationship__c> conlist= new list<Contact_Relationship__c>();
        for(contact con:conNew){
            if(con.Contact_Relationship__c==true){
                Contact_Relationship__c cont =new Contact_Relationship__c();
                
                cont.Name=con.LastName;
                cont.Contact__c=con.Id;
               conlist.add(cont);
                
                
            }
            
            
        }
        insert conlist;
        
    }
}