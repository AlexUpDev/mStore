/**
 * Created by Алексей on 05.12.2019.
 */

({
    saveExpense:function(component, event, helper) {
        let name = component.find("expenseName").get("v.value");
        if(!name.length){
            name = "Расход";
        }
        let value = component.find("expenseValue").get("v.value");
        let category = component.find("Category").get("v.value");
        if((value.length)&&(category.length)) {
            let wallet = component.get("v.wallet").Id;
            let date = component.find("expenseDate").get("v.value");
            let newExpense = component.get("v.newExpense");
            newExpense.Name = name;
            newExpense.Value__c = value;
            newExpense.Category__c = category;
            newExpense.ValletId__c = wallet;
            if(date.length) {
                newExpense.Expense_Date__c = date;
            }
            helper.saveExpense(component, newExpense);
        }
        else {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Проверьте введенные данные!",
                "message": "Сумма и категория не должны быть пустыми!",
                "type": "Warning"
            });
            toastEvent.fire();
        }
    },
    closeExpense: function(component, event, helper) {
        helper.closeExpense(component,event);
    },

});