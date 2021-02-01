/**
 * Created by Алексей on 06.12.2019.
 */

public with sharing class FinGuardReceiptCreateController {
    @AuraEnabled
    public static void saveSelectedReceipt (Reciept__c newReceipt) {
        System.debug('in Apex controller');
        if (newReceipt != null) {
            insert newReceipt;
        }
    }

}