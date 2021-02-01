/**
 * Created by Алексей on 08.12.2019.
 */

({
    init : function(component) {
        console.log("In helper init");
        let action = component.get("c.getExpensesList");
        action.setCallback(this,function(response){
            let state = response.getState();
            console.log(state);
            //check if result is successful
            if(state === "SUCCESS"){
                console.log('response.getReturnValue', response.getReturnValue());
                component.set("v.expensesList", response.getReturnValue());
                let displayedList = component.get("v.expensesList");
                component.set("v.displayedList", displayedList);
                component.set("v.from",0);
                component.set("v.to",component.get("v.pageLength")-1);
                this.paginate(component);
            } else if(state === "ERROR"){
                alert('Error in calling server side action');
            }
        });
        $A.enqueueAction(action);
    },
    paginate : function(component) {
        let displayedList = component.get("v.displayedList");
        component.set("v.pageList", displayedList);
        if(displayedList.length > component.get("v.pageLength")){
            let pageList = [];
            for(let i=0; i<component.get("v.pageLength"); i++){
                pageList.push(displayedList[i]);
            }
            component.set("v.pageList", pageList);
        }
    },
    toNextPage : function(component) {
        let displayedList = component.get("v.displayedList");
        let to = component.get("v.to");
        let from = component.get("v.from");
        let pageList = [];
        let pageLength = component.get("v.pageLength");
        for(let i=0; i<pageLength; i++){
            to++;
            if(displayedList.length > to){
                pageList.push(displayedList[to]);
            }
            from++;
        }
        component.set("v.pageList",pageList);
        component.set("v.from",from);
        component.set("v.to",to);
    },
    toPreviousPage : function(component) {
        let displayedList = component.get("v.displayedList");
        let to = component.get("v.to");
        let from = component.get("v.from");
        let pageList = [];
        let pageLength = component.get("v.pageLength");
        from -= pageLength;
        if(from > -1){
            for(let i=0; i<pageLength; i++){
                if(from > -1){
                    pageList.push(displayedList[from]);
                    from++;
                    to--;
                }
            }
            from -= pageLength;
            component.set("v.pageList",pageList);
            component.set("v.from",from);
            component.set("v.to",to);
        }
    },
    backToWallets:function(component) {
        let appEvent = $A.get("e.c:BackToWalletsEvent");
        appEvent.fire();
        component.destroy();
    },

    filterByWallet: function(component){
        this.resetFilter(component);
        let wallet = component.find("Wallet").get("v.value");
        if (wallet!=="Все") {
            let searchList = [];
            let displayedList = component.get("v.displayedList");
            for (let i = 0; i < displayedList.length; i++) {
                if (displayedList[i].ValletId__r.Name === wallet) {
                    searchList.push(displayedList[i]);
                }
            }
            component.set("v.displayedList", searchList);
            component.set("v.from", 0);
            component.set("v.to", component.get("v.pageLength") - 1);
            this.paginate(component);
        }
    },
    filterByCategory: function(component){
        this.resetFilter(component);
        let category = component.find("Category").get("v.value");
        if (category!=="Все") {
            let searchList = [];
            let displayedList = component.get("v.displayedList");
            for (let i = 0; i < displayedList.length; i++) {
                if (displayedList[i].Category__c === category) {
                    searchList.push(displayedList[i]);
                }
            }
            component.set("v.displayedList", searchList);
            component.set("v.from", 0);
            component.set("v.to", component.get("v.pageLength") - 1);
            this.paginate(component);
        }
    },
    filterByDate: function(component){
        this.resetFilter(component);
        let date = component.find("Date").get("v.value");
        if(date.length) {
            let searchList = [];
            let displayedList = component.get("v.displayedList");
            for (let i = 0; i < displayedList.length; i++) {
                if (displayedList[i].Expense_Date__c === date) {
                    searchList.push(displayedList[i]);
                }
            }
            component.set("v.displayedList", searchList);
            component.set("v.from", 0);
            component.set("v.to", component.get("v.pageLength") - 1);
            this.paginate(component);
        }
    },
    resetFilter: function(component) {
        let resetDisplayedList = component.get("v.expensesList");
        component.set("v.displayedList", resetDisplayedList);
        component.set("v.from",0);
        component.set("v.to",component.get("v.pageLength")-1);
        this.paginate(component);
    },
    changeExpense:function (component,event,checkedExpense){
        let appEvent = $A.get("e.c:ToChangeExpenseEvent");
        appEvent.setParams({
            "checkedExpense": checkedExpense
        });
        appEvent.fire();
        component.destroy();

    },
});