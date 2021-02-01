({
	 init : function(component) {
        console.log("In helper init");
        let action = component.get("c.getProjectsList");
        action.setCallback(this,function(response){
            let state = response.getState();
            console.log(state);
            //check if result is successful
            if(state === "SUCCESS"){
                console.log('response.getReturnValue', response.getReturnValue());
                component.set("v.displayedList", response.getReturnValue());
            } else if(state === "ERROR"){
                alert('Error in calling server side action');
            }
        });
        $A.enqueueAction(action);
    },
    backToWallets:function(component) {
        let appEvent = $A.get("e.c:BackToWalletsEvent");
        appEvent.fire();
        component.destroy();
    },
    viewProjectDetails:function (component,event,checkedProject){
        let appEvent = $A.get("e.c:ToViewProjectDetailsEvent");
        appEvent.setParams({
            "checkedProject": checkedProject
        });
        appEvent.fire();
        component.destroy();

    },
})