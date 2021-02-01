/**
 * Created by aleksejuporojskij on 12/20/19.
 */

public with sharing class FinGuardChangeReceiptController {
    @AuraEnabled
    public static void updateReceipt (Reciept__c newReceipt, string wallet) {
        if(wallet!=''){
            Wallet__c selectWallet =   [SELECT Name
            FROM Wallet__c
            WHERE Name =:wallet];
            newReceipt.ValletId__c =selectWallet.Id;
        }

        if (newReceipt != null) {
            update newReceipt;
        }
    }
    @AuraEnabled
    public static void deleteSelectedReceipt (string receiptToDeleteId) {
        Reciept__c receiptToDelete =   [SELECT Name
        FROM Reciept__c
        WHERE Id =:receiptToDeleteId];

        delete receiptToDelete;

    }

}