({
	saveFuelLoad: function(component, newFuelLoad, price) {
        console.log("In saveFuelLoad helper");
        let action = component.get("c.saveCreatedFuelLoad");
        action.setParams({
            "newFuelLoad": newFuelLoad,
            "price": price
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            console.log("into anon function " + state);
            if (state === "SUCCESS") {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Заправка сохранена",
                    "type": "Success"
                });
                toastEvent.fire();
                component.destroy();
            }
            else (state === "INCOMPLETE")
            {
                console.log("state = INCOMPLETE");
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Не удалось добавить заправка",
                    "type": "Error"
                });
            }
        });
        $A.enqueueAction(action);
    },
})