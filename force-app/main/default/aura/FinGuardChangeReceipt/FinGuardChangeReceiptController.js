/**
 * Created by aleksejuporojskij on 12/20/19.
 */

({
    doInit : function(component, event, helper) {

    },
    saveReceipt:function(component, event, helper) {
        let newReceipt = component.get("v.checkedReceipt");
        let name = component.find("receiptName").get("v.value");
        if(name.length) {
            newReceipt.Name = name;
        }
        let value = component.find("receiptValue").get("v.value");
        if(value.length) {
            newReceipt.Value__c = value;
        }
        let date = component.find("receiptDate").get("v.value");
        if(date.length) {
            newReceipt.Receipt_Date__c = date;
        }
        let category = component.find("Category").get("v.value");
        if(category.length) {
            newReceipt.Category__c = category;
        }
        let wallet = component.find("Wallet").get("v.value");
        helper.saveReceipt(component, newReceipt,wallet);





    },
    backToReceipts: function(component, event, helper) {
        helper.backToReceipts(component,event);
    },
    deleteReceipt: function(component, event, helper) {
        let receiptToDelete = component.get("v.checkedReceipt");
        let receiptToDeleteId = receiptToDelete.Id;
        helper.deleteReceipt(receiptToDeleteId,component,event);
    },
});