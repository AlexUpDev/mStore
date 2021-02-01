public class CarInfoKmController {
@AuraEnabled
    public static void saveCreatedKm(KmPerDay__c newKmPerDay){
        System.debug(newKmPerDay);
       	if (newKmPerDay != null) {
            insert newKmPerDay;
         }
    }
}