public with sharing class CarSummaryFuelLoadController {
	@AuraEnabled
    public static void saveCreatedFuelLoad(FuelLoad__c newFuelLoad, Decimal price){
        System.debug(newFuelLoad);
       	if (newFuelLoad != null) {
            insert newFuelLoad;
            
            Expense__c fuelExpense = new Expense__c();
            fuelExpense.Name = 'Заправка';
            fuelExpense.Category__c = 'Авто';
            fuelExpense.Expense_Date__c = newFuelLoad.Date__c;
            fuelExpense.ValletId__c = 'a002w000001hsXDAAY';
            fuelExpense.Value__c = price;
            insert fuelExpense;
            
         }
        
    }
}