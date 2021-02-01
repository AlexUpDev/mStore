/**
 * Created by aleksejuporojskij on 12/17/19.
 */

({
    saveExpense: function(component, newExpense, wallet) {
        let action = component.get("c.updateExpense");
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
                    "message": "Расход обновлен",
                    "type": "Success"
                });
                toastEvent.fire();
                let appEvent = $A.get("e.c:ToViewExpensesEvent");
                appEvent.fire();
                component.destroy();
            }
            else (state === "INCOMPLETE")
            {
                console.log("state = INCOMPLETE");
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Не удалось обновить расход",
                    "type": "Error"
                });
            }
        });
        $A.enqueueAction(action);
    },
    backToExpenses:  function(component) {
        let appEvent = $A.get("e.c:ToViewExpensesEvent");
        appEvent.fire();
        component.destroy();
    },
    deleteExpense: function(expenseToDeleteId, component) {
        let action = component.get("c.deleteSelectedExpense");
        action.setParams({
            "expenseToDeleteId": expenseToDeleteId
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            console.log("into anon function " + state);
            if (state === "SUCCESS") {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Расход удалён",
                    "type": "Success"
                });
                toastEvent.fire();
                let appEvent = $A.get("e.c:ToViewExpensesEvent");
                appEvent.fire();
                component.destroy();
            }
            else (state === "INCOMPLETE")
            {
                console.log("state = INCOMPLETE");
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Не удалось удалить расход",
                    "type": "Error"
                });
            }
        });
        $A.enqueueAction(action);
    },
});