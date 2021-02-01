public with sharing class CarInfoSummaryController {
    @AuraEnabled
    public static wrapper getCar() {
        Wrapper wrapper = new Wrapper();
        Car__c car = [
            SELECT TotalFuel__c,TotalKm__c,Consumption__c,CreatedDate
        	FROM Car__c
        	LIMIT 1];
        DateTime createdCarDT = car.CreatedDate;
        Date createdCar = date.newinstance(createdCarDT.year(), createdCarDT.month(), createdCarDT.day());
        List<Expense__c> CarExpenses = [
            SELECT Value__c,Expense_Date__c
            FROM Expense__c
            WHERE Category__c = 'Авто'
            AND Expense_Date__c>=:createdCar
        ];
        Decimal carExpensesSumm = 0;
		for(Expense__c carExpense : CarExpenses){
           carExpensesSumm+= carExpense.Value__c;
        }
        
        wrapper.car = car;
        wrapper.carExpensesSumm = carExpensesSumm;
    return wrapper;
    }
    public class Wrapper{
    	@AuraEnabled
        public Car__c car { get; set; }
        @AuraEnabled
        public Decimal carExpensesSumm { get; set; }  
    }
}