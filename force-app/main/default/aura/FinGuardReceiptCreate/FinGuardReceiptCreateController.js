/**
 * Created by Алексей on 07.12.2019.
 */

({
    saveReceipt:function(component, event, helper) {
        let name = component.find("receiptName").get("v.value");
        if(!name.length){
            name = "Доход";
        }
        let value = component.find("receiptValue").get("v.value");
        let category = component.find("Category").get("v.value");
        if((value.length)&&(category.length)) {
            let wallet = component.get("v.wallet").Id;
            let date = component.find("receiptDate").get("v.value");
            let newReceipt = component.get("v.newReceipt");
            newReceipt.Name = name;
            newReceipt.Value__c = value;
            newReceipt.Category__c = category;
            newReceipt.ValletId__c = wallet;
            if(date.length) {
                newReceipt.Expense_Date__c = date;
            }
            helper.saveReceipt(component, newReceipt);
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
    closeReceipt: function(component, event, helper) {
        helper.closeReceipt(component,event);
    },

});