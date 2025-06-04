public class RedirectToRecordTypeController {
    public PageReference redirectToRecordType() {
        // Replace 'YOUR_RECORD_TYPE_ID' with the actual Record Type ID
        String recordTypeId = '012Ig000000TRI5';
        PageReference pageRef = new PageReference('/006/e?recordType=' + recordTypeId);
        pageRef.setRedirect(true);
        return pageRef;
    }
}