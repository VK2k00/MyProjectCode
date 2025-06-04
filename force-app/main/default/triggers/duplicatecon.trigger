trigger duplicatecon on Contact (before insert) {
   for (Contact con : Trigger.new) {
       
       if(con.Phone!=null){
           list<contact> existingphone=[SELECT Id FROM contact where phone=:con.phone AND Id!=:con.id];
           if(!existingphone.isempty()){
               con.adderror('duplicate phone found');
           }
           
           
       }
       
   }
}