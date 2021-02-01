/**
 * Created by aleksejuporojskij on 1/15/20.
 */

({
    saveActions: function(component) {
        console.log("In saveActions Helper");
        let expensesList = component.get("v.expensesList");
        let receiptsList = component.get("v.receiptsList");
        console.log("Expenses: " + expensesList);
        console.log("Receipts: " + receiptsList);
        let action = component.get("c.saveSelectedActions");
        action.setParams({
            "expensesList": expensesList,
            "receiptsList": receiptsList
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            console.log("into anon function " + state);
            if (state === "SUCCESS") {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Ревизия завершена",
                    "type": "Success"
                });
                toastEvent.fire();
                let appEvent = $A.get("e.c:BackToWalletsEvent");
                appEvent.fire();
                component.destroy();
            }
            if (state === "INCOMPLETE")
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
    backToWallets:function(component) {
        let appEvent = $A.get("e.c:BackToWalletsEvent");
        appEvent.fire();
        component.destroy();
    },
});