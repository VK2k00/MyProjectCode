trigger sendEmailToAdmin on Account (after insert){
//To send list of mails when there are insertion of list of Accounts
List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
//Query to get the Email of a System Administrator
User userObj=[select Id,Profile.Name,Email from user where Profile.Name='System Administrator'];
for(Account accObj:Trigger.new){
//Checking if the user email is not null
if(userObj.Email!=null){
//Assigning a single Mail to send
Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
//Assigning the Sender Name for Mail
mail.setSenderDisplayName('Salesforce');
//We are make all this below fields as false because those are not needed for now
mail.setUseSignature(false);
mail.setBccSender(false);
mail.setSaveAsActivity(false);
//Assigning the receiver Mail Address
mail.toAddresses = new String[]{userObj.Email};
//Assign the Subject of the Mail
mail.setSubject('New Account was Created.');
//A variable to write the body of the Mail
String body = 'Dear System Administrator, <br/>';
body += 'An account has been created and name is '+accObj.Name+'.';
//Assigning the variable in which we wrote the body to the Mail Body
mail.setHtmlBody(body);
//Adding each single mail to be sent to the list of mails
mails.add(mail);
}
}
//Checking if the list of mails is not empty
if(mails.size()>0){
//" Messaging.sendEmail(mails) " is used to send the list of mails
Messaging.SendEmailResult[] results = Messaging.sendEmail(mails);
//we are checking if the mails are sent or not.
if (results[0].success)
{
System.debug('The email was sent successfully.');
} else {
System.debug('The email failed to send: '+ results[0].errors[0].message);
}
}
}