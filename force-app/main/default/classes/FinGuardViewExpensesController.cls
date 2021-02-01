/**
 * Created by Алексей on 08.12.2019.
 */

public with sharing class FinGuardViewExpensesController {
    @AuraEnabled(cacheable=true)
    public static List<Expense__c> getExpensesList () {
        List <Expense__c> getExpenses = [
                SELECT  Name,
                        Value__c,
                        Category__c,
                        Expense_Date__c,
                        ValletId__r.Name

                FROM    Expense__c
                ORDER BY Expense_Date__c
                DESC                    ];
        return  getExpenses;



    }
}