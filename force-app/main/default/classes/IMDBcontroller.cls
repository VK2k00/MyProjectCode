public with sharing class IMDBcontroller {
   @AuraEnabled(cacheable=true)
   public static string getMovies(string searchText){
    try {
        
        HttpRequest request = new HttpRequest();
        //remoteste setting
        request.setEndpoint('https://api.collectapi.com/imdb/imdbSearchByName?query='+ searchText);
        request.setMethod('GET');
        request.setHeader('authorization', 'apikey 2txarxBDwRRU3T85cwicLH:3wZMQFpjLWpcpOBH0i8GSn');
        //request.setHeader('Authorization', 'Bearer ' + getAccessToken());

        //named credentials
        // request.setEndpoint('Callout:IMDB/imdb/imdbSearchByName?query='+ searchText);

           Http http = new Http();
        try {
            HttpResponse response = http.send(request);
            if (response.getStatusCode() == 200) {
                string responsebody=response.getbody();
                return responsebody;
            } else {
                STRING errormessage=   'Error: ' + response.getStatusCode() + ' - ' + response.getBody();
                return errormessage;
            }
        } catch (Exception e) {
           system.debug('Exception occured:' + e.getmessage());
           return 'Exception occured:'+e.getmessage();
            
        }
    


    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}