/**
 * Created by aleksejuporojskij on 1/3/20.
 */

public with sharing class FinGuardViewProjectDetailsController {
    @AuraEnabled
    public static void updateValueProject(Project__c projectToUpdate) {

        if (projectToUpdate != null) {
            update projectToUpdate;
        }
    }
    @AuraEnabled
    public static void saveSelectedExpense (Expense__c newExpense, string wallet) {
        System.debug('Wallet of expense: ' + wallet);
        if(wallet!=''){
            Wallet__c selectWallet =    [SELECT Name
                                        FROM Wallet__c
                                        WHERE Id =:wallet];
            newExpense.ValletId__c = selectWallet.Id;
        }
        System.debug('in Apex controller');
        System.debug('newExpenseName: ' + newExpense.Name);
        if (newExpense != null) {
            insert newExpense;
        }
    }
}