/**
 * Created by aleksejuporojskij on 1/3/20.
 */

({
    doInit : function(component, event, helper) {

    },
    backToWallets:function(component,event,helper) {
        helper.backToWallets(component);
    },
    backToProjects:function(component,event,helper) {
        helper.backToProjects(component);
    },
    updateProject:function(component,event,helper) {
    let valueToIncrease = component.find("balanceValue").get("v.value");
    if(!isNaN(valueToIncrease)&&(!valueToIncrease[0].value)) {
        if (valueToIncrease>0) {
            component.set("v.InputDisable", true);
            let numberValueToAdd = parseFloat(valueToIncrease);
            let projectToUpdate = component.get("v.checkedProject");
            projectToUpdate.Balance__c += numberValueToAdd;
            helper.updateProject(component, projectToUpdate,numberValueToAdd);
        }
        else {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Неверное значение!",
                    "message": "Сумма должна быть выше 0!",
                    "type": "ERROR"
                });
                toastEvent.fire();
        }
    }

    else {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Неверное значение!",
                "message": "Введите корректное значение!",
                "type":"ERROR"
            });
            toastEvent.fire();
        }

    },
});