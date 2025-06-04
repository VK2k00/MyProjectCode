@RestResource(urlMapping='/Accapi/*')
global with sharing class AccountRestCall {
    private static String getAccountIds(List<Account> accounts) {
        List<String> accountIds = new List<String>();
        for (Account acc : accounts) {
            accountIds.add(acc.Id);
        }
        return String.join(accountIds, ', ');
    }
        public class dataclass {
        public String Name;
        public String Phone;
        public String Phone2;
    }
    
    public class RequestWrapper {
        public List<dataclass> data;
        public String action; 
    }

    public static RequestWrapper parse(String json) {
        return (RequestWrapper) System.JSON.deserialize(json, RequestWrapper.class);
    }
    
    public class ResponseWrapper {
        public Boolean status;
        public String message;
    }

    public static String getResponse(Boolean status, String msg) {
        ResponseWrapper respWrapper = new ResponseWrapper();
        respWrapper.status = status;
        respWrapper.message = msg;
        return JSON.serialize(respWrapper);
    }

    @HttpPost
    global static void doPost() {
        String jsonRequestStr = RestContext.request.requestBody.toString();
        String responseStr;
        Boolean status;
        String response;

        try {
            List<Account> acclist = new List<Account>();
            RequestWrapper wrapper = RequestWrapper.parse(jsonRequestStr);

            system.debug('wrapper'+wrapper);

            if (!String.isBlank(wrapper.action) && wrapper.action.equalsIgnoreCase('insert')) {
                for (dataclass accountData : wrapper.data) {
                    Account acc = new Account();
                    acc.Name = accountData.Name;
                    acc.Phone = accountData.Phone;
                    acc.Phone2__c = accountData.Phone2;
                    acclist.add(acc);
                    
                     if (acc.Phone != null) {
            String[] phoneValues = acc.Phone.split(',');
                         
            if (phoneValues.size() >= 2) {
                acc.Phone = phoneValues[0].trim();
                 acc.Phone2__c = phoneValues[1].trim();
            }
        }   }

                insert acclist;
                responseStr = 'Records are Created with Record Ids: ' + getAccountIds(acclist);
                status = true;
            } else {
                responseStr = 'Error --> Please make sure the action is insert only.';
                status = false;
            }
        } catch (Exception e) {
            responseStr = 'Error --> ' + e.getMessage();
            status = false;
        }

        // Get Response
        response = getResponse(status, responseStr);

        // Send Response
        RestContext.response.addHeader('Content-Type', 'application/json');
        RestContext.response.responseBody = Blob.valueOf(response);
    }

}