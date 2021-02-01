/**
 * Created by aleksejuporojskij on 12/17/19.
 */

public with sharing class FinGuardChangeExpenseController {
    @AuraEnabled
    public static void updateExpense (Expense__c newExpense, string wallet) {
        if(wallet!=''){
            Wallet__c selectWallet =   [SELECT Name
                                        FROM Wallet__c
                                        WHERE Name =:wallet];
            newExpense.ValletId__c =selectWallet.Id;
        }

        if (newExpense != null) {
            update newExpense;
        }
    }
    @AuraEnabled
    public static void deleteSelectedExpense (string expenseToDeleteId) {
            Expense__c expenseToDelete =   [SELECT Name
            FROM Expense__c
            WHERE Id =:expenseToDeleteId];
        System.debug('Name of deleted expense: ' + expenseToDelete.Name);

        delete expenseToDelete;

    }
}