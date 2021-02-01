({
	saveKm: function(component, newKmPerDay) {
        console.log("In saveKm helper");
        let action = component.get("c.saveCreatedKm");
        action.setParams({
            "newKmPerDay": newKmPerDay
        });
        action.setCallback(this, function(response) {
            let state = response.getState();
            console.log("into anon function " + state);
            if (state === "SUCCESS") {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Пробег сохранен",
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
                    "message": "Не удалось сохранить пробег",
                    "type": "Error"
                });
            }
        });
        $A.enqueueAction(action);
    },
})