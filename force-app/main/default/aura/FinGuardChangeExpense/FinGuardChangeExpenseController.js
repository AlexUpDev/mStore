/**
 * Created by aleksejuporojskij on 12/17/19.
 */

({
    doInit : function(component, event, helper) {

    },
    saveExpense:function(component, event, helper) {
        let newExpense = component.get("v.checkedExpense");
        let name = component.find("expenseName").get("v.value");
        if(name.length) {
            newExpense.Name = name;
        }
        let value = component.find("expenseValue").get("v.value");
        if(value.length) {
            newExpense.Value__c = value;
        }
        let date = component.find("expenseDate").get("v.value");
        if(date.length) {
            newExpense.Expense_Date__c = date;
        }
        let category = component.find("Category").get("v.value");
        if(category.length) {
            newExpense.Category__c = category;
        }
        let wallet = component.find("Wallet").get("v.value");
        helper.saveExpense(component, newExpense,wallet);





    },
    backToExpenses: function(component, event, helper) {
        helper.backToExpenses(component,event);
    },
    deleteExpense: function(component, event, helper) {
        let expenseToDelete = component.get("v.checkedExpense");
        let expenseToDeleteId = expenseToDelete.Id;
        helper.deleteExpense(expenseToDeleteId,component,event);
    },
});