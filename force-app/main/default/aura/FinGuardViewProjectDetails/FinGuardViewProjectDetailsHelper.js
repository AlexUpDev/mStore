/**
 * Created by aleksejuporojskij on 1/3/20.
 */

({
    backToWallets:function(component) {
        let appEvent = $A.get("e.c:BackToWalletsEvent");
        appEvent.fire();
        component.destroy();
    },
    backToProjects:function(component) {
        let appEvent = $A.get("e.c:ToViewProjectsEvent");
        appEvent.fire();
        component.destroy();
    },
    updateProject:function(component, projectToUpdate, numberValueToAdd) {
        let action = component.get("c.updateValueProject");
        action.setParams({
            "projectToUpdate": projectToUpdate
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            console.log("into anon function " + state);
            if (state === "SUCCESS") {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Баланс обновлен",
                    "type": "Success"
                });
                toastEvent.fire();
                this.saveExpense(component, projectToUpdate, numberValueToAdd);
            }
            else (state === "INCOMPLETE")
            {
                console.log("state = INCOMPLETE");
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Не удалось обновить баланс",
                    "type": "Error"
                });
            }
        });
        $A.enqueueAction(action);

    },
    saveExpense: function(component,projectToUpdate,numberValueToAdd) {
        console.log("In saveExpense Helper");
        let newExpense = component.get("v.newExpense");
        newExpense.Name = projectToUpdate.Name;
        newExpense.Value__c =  numberValueToAdd;
        newExpense.Category__c = "Проекты";
        let wallet = projectToUpdate.Wallet__c;
        console.log("Wallet of project: " + wallet);

        console.log("Name of expense: " + newExpense.Name);
        console.log("Value of expense: " + newExpense.Value__c);
        console.log("Category of expense: " + newExpense.Category__c);

        let action = component.get("c.saveSelectedExpense");
        action.setParams({
            "newExpense": newExpense,
            "wallet": wallet
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            console.log("into anon function " + state);
            if (state === "SUCCESS") {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Новый расход добавлен",
                    "type": "Success"
                });
                toastEvent.fire();
                let appEvent = $A.get("e.c:ToViewProjectsEvent");
                appEvent.fire();
                component.destroy();
            }
            else (state === "INCOMPLETE")
            {
                console.log("state = INCOMPLETE");
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Не удалось добавить новый расход",
                    "type": "Error"
                });
            }
        });
        $A.enqueueAction(action);
    },
});