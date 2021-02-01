({
	init: function(component, event, helper){
        helper.init(component);
    },
    
    fuelLoad: function(component, event, helper) {
        console.log("In fuelLoad Controller");
        helper.fuelLoad(component);
   	},
    kmPerDay: function(component, event, helper) {
        console.log("In kmPerDay Controller");
        helper.kmPerDay(component);
   	},
})