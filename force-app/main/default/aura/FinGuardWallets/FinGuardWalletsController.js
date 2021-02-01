/**
 * Created by Алексей on 05.12.2019.
 */

({
    init: function(component, event, helper){
        helper.init(component);
    },
    addNewExpense: function(component, event, helper){
        let wallet = event.getSource().get("v.value");
        helper.addNewExpense(component,event,wallet);
    },
    addNewReceipt: function(component, event, helper){
        let wallet = event.getSource().get("v.value");

        helper.addNewReceipt(component,event,wallet);
    },
    viewExpenses: function(component, helper){
        helper.viewExpenses(component);
    },
    viewReceipts: function(component, helper){
        helper.viewReceipts(component);
    },
    viewProjects: function(component, helper){
        helper.viewProjects(component);
    },
    toRevision: function(component, event, helper){
        let walletsList = component.get("v.walletsList");
        helper.toRevision(component, event, walletsList);
    },
     viewTemplates: function(component, helper){
        helper.viewTemplates(component);
    },

});