/**
 * Created by aleksejuporojskij on 12/20/19.
 */

({
    saveReceipt: function(component, newReceipt, wallet) {
        let action = component.get("c.updateReceipt");
        action.setParams({
            "newEReceipt": newReceipt,
            "wallet": wallet
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            console.log("into anon function " + state);
            if (state === "SUCCESS") {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Доход обновлен",
                    "type": "Success"
                });
                toastEvent.fire();
                let appEvent = $A.get("e.c:ToViewReceiptsEvent");
                appEvent.fire();
                component.destroy();
            }
            else (state === "INCOMPLETE")
            {
                console.log("state = INCOMPLETE");
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Не удалось обновить доход",
                    "type": "Error"
                });
            }
        });
        $A.enqueueAction(action);
    },
    backToReceipts:  function(component) {
        let appEvent = $A.get("e.c:ToViewReceiptsEvent");
        appEvent.fire();
        component.destroy();
    },
    deleteReceipt: function(receiptToDeleteId, component) {
        let action = component.get("c.deleteSelectedReceipt");
        action.setParams({
            "receiptToDeleteId": receiptToDeleteId
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            console.log("into anon function " + state);
            if (state === "SUCCESS") {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Доход удалён",
                    "type": "Success"
                });
                toastEvent.fire();
                let appEvent = $A.get("e.c:ToViewReceiptsEvent");
                appEvent.fire();
                component.destroy();
            }
            else (state === "INCOMPLETE")
            {
                console.log("state = INCOMPLETE");
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Не удалось удалить доход",
                    "type": "Error"
                });
            }
        });
        $A.enqueueAction(action);
    },
});