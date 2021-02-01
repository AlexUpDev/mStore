public with sharing class PlanesController {
    @AuraEnabled(cacheable=true)
    public static List<Plane__c> getPlanes() {
        return [
            SELECT FullName__c, Manufacture__c, Model__c, Modification__c, MaxCruiseSpeed__c, MaxWeight__c, Passengers__c, Range__c
            FROM Plane__c
            WITH SECURITY_ENFORCED
            ORDER BY FullName__c 
        ];
    }
}