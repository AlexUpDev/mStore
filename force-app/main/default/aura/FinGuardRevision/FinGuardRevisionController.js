/**
 * Created by aleksejuporojskij on 1/15/20.
 */

({

    doInit : function(component) {
    let walletsList = component.get("v.walletsList");
    let totalBYN = 0;
    let totalUSD = 0;
    for(let i=0; i<walletsList.length; i++){
        if(walletsList[i].Monetary_Unit__c == 'BYN'){
            totalBYN+= walletsList[i].Balance__c;
        }
        if(walletsList[i].Monetary_Unit__c == 'USD'){
            totalUSD+= walletsList[i].Balance__c;
        }
   	}
    let differenceBYN = totalBYN;
    let roundDifferenceBYN = differenceBYN.toFixed(2);
    let differenceUSD = totalUSD;
    let roundDifferenceUSD = differenceUSD.toFixed(2);
    console.log("Total BYN: " + totalBYN);
    console.log("Total USD: " + totalUSD);
    let roundTotalBYN = totalBYN.toFixed(2);
    let roundTotalUSD = totalUSD.toFixed(2);
    component.set("v.totalBYN", roundTotalBYN);
    component.set("v.totalUSD", roundTotalUSD);
    component.set("v.differenceBYN", roundDifferenceBYN);
    component.set("v.differenceUSD", roundDifferenceUSD);
    },

    updateBYNFact:function(component) {
        let BYNToAdd = component.find("BYNToAdd").get("v.value");
        if(!isNaN(BYNToAdd)&&(!BYNToAdd[0].value)){
            if(BYNToAdd>0) {
                console.log("Inputted BYN: " + BYNToAdd);
                let numberBYNToAdd = parseFloat(BYNToAdd);
                let currentBYNFact = component.get("v.totalBYNFact");
                let resultBYNFact = currentBYNFact +numberBYNToAdd;
                let totalBYN = component.get("v.totalBYN");
                let differenceBYN = totalBYN - resultBYNFact;
                let roundDifferenceBYN = differenceBYN.toFixed(2);
                component.set("v.differenceBYN", roundDifferenceBYN);
				component.set("v.totalBYNFact", resultBYNFact);

            }
            else {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Сумма должна быть больше нуля!",
                    "type": "ERROR"
                });
                toastEvent.fire();
            }
        }
        else {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "message": "Проверь введенное значение!!!",
                "type":"ERROR"
            });
            toastEvent.fire();
        }
    },

    updateUSDFact:function(component) {
        let USDToAdd = component.find("USDToAdd").get("v.value");
        if(!isNaN(USDToAdd)&&(!USDToAdd[0].value)){
            if(USDToAdd>0) {
                console.log("Inputted USD: " + USDToAdd);
                let numberUSDToAdd = parseFloat(USDToAdd);
                let currentUSDFact = component.get("v.totalUSDFact");
                let resultUSDFact = currentUSDFact +numberUSDToAdd;
                let totalUSD = component.get("v.totalUSD");
                let differenceUSD = totalUSD - resultUSDFact;
                let roundDifferenceUSD = differenceUSD.toFixed(2);
                component.set("v.totalUSDFact", resultUSDFact);
                component.set("v.differenceUSD", roundDifferenceUSD);


            }
            else {
                let toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "message": "Сумма должна быть больше нуля!",
                    "type": "ERROR"
                });
                toastEvent.fire();
            }
        }
        else {
            let toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "message": "Проверь введенное значение!!!",
                "type":"ERROR"
            });
            toastEvent.fire();
        }
    },

    backToWallets:function(component,event,helper) {
        helper.backToWallets(component);
    },


    completeRevision:function(component,event,helper) {
        console.log("In completeRevision");
        let differenceBYN = component.get("v.differenceBYN");
        let differenceUSD = component.get("v.differenceUSD");
        if(differenceBYN>0||differenceUSD>0){
            let expensesList = component.get("v.expensesList");
            if(differenceBYN>0){
        		console.log("Before creation of expense");
            	let newExpense = component.get("v.newExpense");
                console.log("newExpense created");
            	newExpense.Name = "Ревизия";
            	newExpense.Value__c =  differenceBYN;
                if (newExpense.Value__c.includes(".")) {
            		newExpense.Value__c = newExpense.Value__c.replace(".",",");
        		}
            	newExpense.Category__c = "Коррекция-";
                newExpense.ValletId__c = 'a002w000001hsXDAAY';
            	expensesList.push(newExpense);	
            }
            if(differenceUSD>0){
                console.log("Before creation newExpense2");
                let newExpense2 = component.get("v.newExpense2");
                newExpense2.Name = "Ревизия";
                newExpense2.Value__c =  differenceUSD;
                if (newExpense2.Value__c.includes(".")) {
            		newExpense2.Value__c = newExpense2.Value__c.replace(".",",");
        		}
                newExpense2.Category__c = "Коррекция-";
                newExpense2.ValletId__c = 'a002w000001hsXIAAY';
                expensesList.push(newExpense2);
            }
            component.set("v.expensesList", expensesList);
        }
        if(differenceBYN<0||differenceUSD<0){
            let receiptsList = component.get("v.receiptsList");
            if(differenceBYN<0){
                let newReceipt = component.get("v.newReceipt");
                newReceipt.Name = "Ревизия";
                newReceipt.Value__c =  -differenceBYN;
                newReceipt.Category__c = "Коррекция+";
                newReceipt.ValletId__c = 'a002w000001hsXDAAY';
            	receiptsList.push(newReceipt);
            }
            if(differenceUSD<0){
                let newReceipt2 = component.get("v.newReceipt2");
                newReceipt2.Name = "Ревизия";
                newReceipt2.Value__c =  -differenceUSD;
                newReceipt2.Category__c = "Коррекция+";
                newReceipt2.ValletId__c = 'a002w000001hsXIAAY';
            	receiptsList.push(newReceipt2);	
            }
            component.set("v.receiptsList", receiptsList);
        }
        helper.saveActions(component, event);
    },
});