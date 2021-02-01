/**
 * Created by aleksejuporojskij on 1/3/20.
 */

({
    init: function(component, event, helper){
        helper.init(component);
    },
    backToWallets:function(component,event,helper) {
        helper.backToWallets(component);
    },
    viewProjectDetails: function(component, event, helper){
        let checkedProject = event.getSource().get("v.value");
        helper.viewProjectDetails(component,event, checkedProject);

    },
});