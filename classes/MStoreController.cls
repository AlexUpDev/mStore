public with sharing class MStoreController {

    @AuraEnabled
    public static List <Wallet__c> getAccounts() {
        List<Wallet__c> accounts = [
            SELECT  Name, CreatedDate, Balance__c, Currency__c, Total_Expenses__c, Total_Receipts__c
            FROM    Wallet__c
        ];
        return  accounts;
    }

    @AuraEnabled
    public static Map<String, List<String>> getCategoriesOptions() {

        Map<String, List<String>> optionsMap = new Map<String, List<String>>();
        List<CategoryOptions__mdt> options = [
            SELECT 	MasterLabel, Options__c
            FROM CategoryOptions__mdt
        ];

        for (CategoryOptions__mdt o : options) {
            List<String> optionsList = new List<String>();
            optionsList = o.Options__c.split(';');
            optionsMap.put(o.MasterLabel, optionsList);
        }
        
        return optionsMap;
    }

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