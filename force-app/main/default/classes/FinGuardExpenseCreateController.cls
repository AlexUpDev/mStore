/**
 * Created by Алексей on 05.12.2019.
 */

public with sharing class FinGuardExpenseCreateController {
    @AuraEnabled
    public static void saveSelectedExpense (Expense__c newExpense) {
        System.debug('in Apex controller');
        System.debug('newExpenseName: ' + newExpense.Name);
        System.debug('newExpenseValue: ' + newExpense.Value__c);
        System.debug('newExpenseName: ' + newExpense.Name);
        if (newExpense != null) {
            insert newExpense;
        }
    }

}