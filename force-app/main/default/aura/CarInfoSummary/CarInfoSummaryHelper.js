({
	init : function(component) {
        console.log("In helper init");
        let action = component.get("c.getCar");
        action.setCallback(this,function(response){
            let state = response.getState();
            console.log(state);
            //check if result is successful
            if(state === "SUCCESS"){
                console.log('response.getReturnValue', response.getReturnValue());
                component.set("v.Car", response.getReturnValue().car);
                component.set("v.CarExpenses", response.getReturnValue().carExpensesSumm);
                this.calculateKmPerDayAndExpensesPerKM(component);
            } else if(state === "ERROR"){
                alert('Error in calling server side action');
            }
        });
        $A.enqueueAction(action);
    },
	calculateKmPerDayAndExpensesPerKM:function(component) {
        let today = new Date();
        let Car =component.get("v.Car");
        let carExpenses =component.get("v.CarExpenses");
        let startDate = Car.CreatedDate;
        console.log("Start date is: " + startDate);
        console.log("Today date is: " + today);
        let days = Math.round((new Date(today).getTime() - new Date(startDate).getTime())/1000/60/60/24) +1;
        console.log("Days equals: " + days);
        let kmPerDay = (Car.TotalKm__c/days).toFixed(1);
        let expensesPerKm = (carExpenses/Car.TotalKm__c).toFixed(2);
        console.log(expensesPerKm);
    	component.set("v.KmPerDay", kmPerDay);
        component.set("v.ExpensesPerKM", expensesPerKm);
},
   fuelLoad: function(component) {
       	console.log("In AddFuelLoad Helper");
        $A.createComponent(
            "c:CarSummaryFuelLoad",
            {},
            function(newComponent, status, errorMessage){
                console.log("status:", status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    },  
     kmPerDay: function(component) {
       	console.log("In AddFuelLoad Helper");
        $A.createComponent(
            "c:CarInfoKm",
            {},
            function(newComponent, status, errorMessage){
                console.log("status:", status);
                if (status === "SUCCESS") {
                    let body = component.find("root");
                    body.set("v.body", newComponent);
                }
                else if (status === "INCOMPLETE") {
                    console.log("No response from server or client is offline.")
                }
                else if (status === "ERROR") {
                    console.log("Error: " + errorMessage);
                }
            }
        );
    }, 
})