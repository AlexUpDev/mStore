/**
 * Created by Алексей on 05.12.2019.
 */

({
    init : function(component) {
        console.log("In helper init");
        let action = component.get("c.getWalletsList");
        action.setCallback(this,function(response){
            let state = response.getState();
            console.log(state);
            //check if result is successful
            if(state === "SUCCESS"){
                console.log('response.getReturnValue', response.getReturnValue());
                component.set("v.walletsList", response.getReturnValue());
                this.calculateDays(component);
            } else if(state === "ERROR"){
                alert('Error in calling server side action');
            }
        });
        $A.enqueueAction(action);
    },
    calculateDays:function(component) {
        let today = new Date();
        let walletsList =component.get("v.walletsList");
        let startDate = walletsList[0].CreatedDate;
        console.log("Start date is: " + startDate);
        console.log("Today date is: " + today);
        let days = Math.round((new Date(today).getTime() - new Date(startDate).getTime())/1000/60/60/24);
        console.log("Days equals: " + days);
        let totalExpenses=0;
        let totalReceipts=0;
        for(let i=0; i<walletsList.length; i++){
            totalExpenses+=walletsList[i].Total_Expenses__c;
            totalReceipts+=walletsList[i].Total_Receipts__c;
        }
        console.log("Total expenses: " + totalExpenses);
        console.log("Total receipts: " +totalReceipts);
        let averageExpense = (totalExpenses/days).toFixed(2);
        let averageReceipt = (totalReceipts/days).toFixed(2);
        console.log("Average expense: " +averageExpense +"/day");
        console.log("Average receipt: " +averageReceipt +"/day");
    },
    addNewExpense: function(component,event,wallet){
        let appEvent = $A.get("e.c:ToNewExpenseEvent");
        appEvent.setParams({
            "wallet": wallet
        });
        appEvent.fire();
        component.destroy();
        },
    addNewReceipt: function(component,event,wallet){
        let appEvent = $A.get("e.c:ToNewReceiptEvent");
        appEvent.setParams({
            "wallet": wallet
        });
        appEvent.fire();
        component.destroy();
        },
    viewExpenses: function(component){
        let appEvent = $A.get("e.c:ToViewExpensesEvent");
        appEvent.setParams({
        });
        appEvent.fire();
        component.destroy();
    },
    viewReceipts: function(component){
        let appEvent = $A.get("e.c:ToViewReceiptsEvent");
        appEvent.setParams({
        });
        appEvent.fire();
        component.destroy();
    },
    viewProjects: function(component){
        console.log("In helper viewProjects");
        let appEvent = $A.get("e.c:ToViewProjectsEvent");
        appEvent.setParams({
        });
        appEvent.fire();
        component.destroy();
    },
    toRevision: function(component,event,walletsList){
        let appEvent = $A.get("e.c:ToRevisionEvent");
        appEvent.setParams({
            "walletsList": walletsList
        });
        appEvent.fire();
        component.destroy();
    },
    viewTemplates: function(component){
        console.log("In helper viewProjects");
        let appEvent = $A.get("e.c:ToViewTemplatesEvent");
        appEvent.setParams({
        });
        appEvent.fire();
        component.destroy();
    },

});