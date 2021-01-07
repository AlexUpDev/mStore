public with sharing class MStoreSaveOperations {

    @AuraEnabled
    public static Boolean saveOperations(List<SObject> operations) {
        Boolean success = true;
        List<Database.SaveResult> results = Database.insert(operations, true);
        for (Database.SaveResult r : results) {
            if (!r.isSuccess()) {
                success = false;
                break;
            }
        }
        return success;
    }
}