/**
 * Created by aleksejuporojskij on 1/14/20.
 */

public with sharing class FinGuardRevisionController {
    @AuraEnabled
    public static void saveSelectedActions (List<Expense__c>expensesList,List<Reciept__c>receiptsList) {
		if(expensesList.size()>0){
           	insert expensesList; 
        }
        if(receiptsList.size()>0){
           	insert receiptsList; 
        }   
    }     
}