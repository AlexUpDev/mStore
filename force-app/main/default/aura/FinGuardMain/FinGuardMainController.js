/**
 * Created by Алексей on 05.12.2019.
 */

({
    initFinGuardWallets: function(component) {
        $A.createComponent(
            "c:FinGuardWallets",
            {},
            function(newComponent, status, errorMessage){
                console.log('status:', status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
    handleToNewExpenseEvent : function(component,event) {
        let wallet = event.getParam("wallet");
        $A.createComponent(
            "c:FinGuardExpenseCreate",
            {"wallet" : wallet},
            function(newComponent, status, errorMessage){
                console.log('status:', status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
    handleToNewReceiptEvent : function(component,event) {
        let wallet = event.getParam("wallet");
        $A.createComponent(
            "c:FinGuardReceiptCreate",
            {"wallet" : wallet},
            function(newComponent, status, errorMessage){
                console.log('status:', status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
    initFinGuardViewExpenses: function(component) {
        $A.createComponent(
            "c:FinGuardViewExpenses",
            {},
            function(newComponent, status, errorMessage){
                console.log('status:', status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
    initFinGuardViewReceipts: function(component) {
        $A.createComponent(
            "c:FinGuardViewReceipts",
            {},
            function(newComponent, status, errorMessage){
                console.log('status:', status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
    handleToChangeExpense : function(component,event) {
        let checkedExpense = event.getParam("checkedExpense");
        $A.createComponent(
            "c:FinGuardChangeExpense",
            {"checkedExpense" : checkedExpense},
            function(newComponent, status, errorMessage){
                console.log('status:', status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
    handleToChangeReceipt : function(component,event) {
        let checkedReceipt = event.getParam("checkedReceipt");
        $A.createComponent(
            "c:FinGuardChangeReceipt",
            {"checkedReceipt" : checkedReceipt},
            function(newComponent, status, errorMessage){
                console.log('status:', status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
    handleToViewProjects : function(component) {
        $A.createComponent(
            "c:FinGuardViewProjects",
            {},
            function(newComponent, status, errorMessage){
                console.log('status:', status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
    handleToViewProjectDetails : function(component,event) {
        let checkedProject = event.getParam("checkedProject");
        $A.createComponent(
            "c:FinGuardViewProjectDetails",
            {"checkedProject" : checkedProject},
            function(newComponent, status, errorMessage){
                console.log('status:', status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },

    handleToRevisionEvent : function(component,event) {
        let walletsList = event.getParam("walletsList");
        $A.createComponent(
            "c:FinGuardRevision",
            {"walletsList" : walletsList},
            function(newComponent, status, errorMessage){
                console.log('status:', status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
     handleToViewTemplatesEvent : function(component) {
        $A.createComponent(
            "c:FinGuardViewTemplates",
            {},
            function(newComponent, status, errorMessage){
                console.log('status:', status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },
});