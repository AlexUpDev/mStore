/**
 * Created by Алексей on 05.12.2019.
 */

({
    saveExpense: function(component, newExpense) {
        console.log("in Helper saveExpense" );
        let action = component.get("c.saveSelectedExpense");
        action.setParams({
            "newExpense": newExpense
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
                let appEvent = $A.get("e.c:BackToWalletsEvent");
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
    closeExpense:  function(component) {
        let appEvent = $A.get("e.c:BackToWalletsEvent");
        appEvent.fire();
        component.destroy();
    },

});