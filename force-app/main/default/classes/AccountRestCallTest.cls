@isTest
private class AccountRestCallTest {

    @isTest
    static void testPostMethod() {
        String requestBody = '{"data":[{"Name":"TestAccount1","Phone":"1234567890,9090909090"}],"action":"insert"}';

        RestRequest req = new RestRequest();
        req.requestURI = '/services/apexrest/Accapi/';
        req.httpMethod = 'POST';
        req.requestBody = Blob.valueOf(requestBody);

        RestContext.request = req;
        RestResponse res = new RestResponse();
        RestContext.response = res;

        AccountRestCall.doPost();

        String responseBody = res.responseBody.toString();
        System.assertEquals(true, responseBody.contains('"status":true'), 'Expected success status');
        System.assertEquals(true, responseBody.contains('"message":"Records are Created with Record Ids:'), 'Expected success message');
    }

    @isTest
    static void testInvalidAction() {
        String requestBody = '{"data":[{"Name":"TestAccount1","Phone":"1234567890,9090909090"}],"action":"invalidAction"}';

        RestRequest req = new RestRequest();
        req.requestURI = '/services/apexrest/Accapi/';
        req.httpMethod = 'POST';
        req.requestBody = Blob.valueOf(requestBody);

        RestContext.request = req;
        RestResponse res = new RestResponse();
        RestContext.response = res;

        AccountRestCall.doPost();

        String responseBody = res.responseBody.toString();
        System.assertEquals(true, responseBody.contains('"status":false'), 'Expected error status');
    }


}