({
    closePopup : function(component) {
        component.destroy();
    },
    saveFuelLoad:function(component, event, helper) {
        let value = component.find("inputAmountOfFuel").get("v.value");
        let price = component.find("inputPriceOfFuel").get("v.value")
        if(value.length&&price.length) {
            console.log("Value != 0");
            let carId = 'a052w000000HdiJAAS';
            let date = component.find("fuelLoadDate").get("v.value");
            let newFuelLoad = component.get("v.newFuelLoad");
            let name = "Заправка ";
            let today = new Date();
            newFuelLoad.Amount__c = value;
            newFuelLoad.CarId__c = carId;
            if(date.length){
                newFuelLoad.Date__c = date;
            }
            if(!date.length){
                newFuelLoad.Date__c = new Date(today);
            }
            newFuelLoad.Name = name + newFuelLoad.Date__c;
            console.log(newFuelLoad.Name);
            console.log(newFuelLoad.CarId__c);
            console.log(newFuelLoad.Amount__c);
            helper.saveFuelLoad(component, newFuelLoad, price);
        } else {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "message": "Проверьте сумму и количество топлива!",
                "type": "Error"
            });
            toastEvent.fire();
        }
    },
})