/**
 * Created by Алексей on 08.12.2019.
 */

({
    init: function(component, event, helper){
        helper.init(component);
    },
    backToWallets:function(component,event,helper) {
        helper.backToWallets(component);
    },
    toNextPage : function(component, event, helper) {
        helper.toNextPage(component);
    },

    toPreviousPage : function(component,event, helper) {
        helper.toPreviousPage(component);
    },
    filterByWallet: function(component, event, helper){
        helper.filterByWallet(component);
    },
    filterByCategory: function(component, event, helper){
        helper.filterByCategory(component);
    },
    filterByDate: function(component, event, helper){
        helper.filterByDate(component);
    },
    changeExpense: function(component, event, helper){
        let checkedExpense = event.getSource().get("v.value");
        helper.changeExpense(component,event, checkedExpense);
        
    },




});