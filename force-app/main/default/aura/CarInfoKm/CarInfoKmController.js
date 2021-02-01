({
    closePopup : function(component) {
        component.destroy();
    },
    saveKm:function(component, event, helper) {
        let value = component.find("inputKm").get("v.value");
        if(value.length) {
            console.log("Value != 0");
            let carId = 'a052w000000HdiJAAS';
            let date = component.find("kmDate").get("v.value");
            let newKmPerDay = component.get("v.newKmPerDay");
            let name = "Пробег ";
            let today = new Date();
            newKmPerDay.Amount__c = value;
            newKmPerDay.CarId__c = carId;
            if(date.length){
                newKmPerDay.Date__c = date;
            }
            if(!date.length){
                newKmPerDay.Date__c = new Date(today);
            }
            newKmPerDay.Name = name + newKmPerDay.Date__c;
            console.log(newKmPerDay.Name);
            console.log(newKmPerDay.CarId__c);
            console.log(newKmPerDay.Amount__c);
            helper.saveKm(component, newKmPerDay);
        } else {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "message": "Введите пробег за сутки!",
                "type": "Error"
            });
            toastEvent.fire();
        }
    },
})