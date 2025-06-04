@isTest
private class AccountRestCallTestclass {

    @isTest
    static void testPostMethod() {
        // Prepare test data
        String requestBody = '{"data":[{"Name":"TestAccount1","Phone":"1234567890,9090909090"}],"action":"insert"}';

        // Create a mock request
        RestRequest req = new RestRequest();
        req.requestURI = '/services/apexrest/Accapi/';
        req.httpMethod = 'POST';
        req.requestBody = Blob.valueOf(requestBody);

        // Set up mock context
        RestContext.request = req;
        RestResponse res = new RestResponse();
        RestContext.response = res;

        // Call the method to be tested
        AccountRestCall.doPost();

        // Verify the response
        String responseBody = res.responseBody.toString();
        System.assertEquals(true, responseBody.contains('"status":true'), 'Expected success status');
        System.assertEquals(true, responseBody.contains('"message":"Records are Created with Record Ids:'), 'Expected success message');
    }

    @isTest
    static void testInvalidAction() {
        // Prepare test data with an invalid action
        String requestBody = '{"data":[{"Name":"TestAccount1","Phone":"1234567890,9090909090"}],"action":"invalidAction"}';

        // Create a mock request
        RestRequest req = new RestRequest();
        req.requestURI = '/services/apexrest/Accapi/';
        req.httpMethod = 'POST';
        req.requestBody = Blob.valueOf(requestBody);

        // Set up mock context
        RestContext.request = req;
        RestResponse res = new RestResponse();
        RestContext.response = res;

        // Call the method to be tested
        AccountRestCall.doPost();

        // Verify the response
        String responseBody = res.responseBody.toString();
        System.assertEquals(true, responseBody.contains('"status":false'), 'Expected error status');
    }
}