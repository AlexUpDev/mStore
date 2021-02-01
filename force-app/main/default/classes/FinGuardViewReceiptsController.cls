/**
 * Created by Алексей on 10.12.2019.
 */

public with sharing class FinGuardViewReceiptsController {
    @AuraEnabled(cacheable=true)
    public static List<Reciept__c> getReceiptsList () {
        List <Reciept__c> getReceipts = [
                SELECT  Name,
                        Value__c,
                        Category__c,
                        Receipt_Date__c,
                        ValletId__r.Name

                FROM    Reciept__c
                ORDER BY Receipt_Date__c
                        DESC                    ];
        return  getReceipts;



    }
}