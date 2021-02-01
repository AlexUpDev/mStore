/**
 * Created by Алексей on 07.12.2019.
 */

({
    saveReceipt: function(component, newReceipt) {
        let action = component.get("c.saveSelectedReceipt");
        action.setParams({
            "newReceipt": newReceipt
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            console.log("into anon function " + state);
            if (state === "SUCCESS") {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Новый доход добавлен",
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
                    "message": "Не удалось добавить новый доход",
                    "type": "Error"
                });
            }
        });
        $A.enqueueAction(action);
    },
    closeReceipt:  function(component) {
        let appEvent = $A.get("e.c:BackToWalletsEvent");
        appEvent.fire();
        component.destroy();
    },

});