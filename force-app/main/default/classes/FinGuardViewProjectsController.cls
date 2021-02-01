/**
 * Created by aleksejuporojskij on 1/3/20.
 */

public with sharing class FinGuardViewProjectsController {
    @AuraEnabled
    public static List<Project__c> getProjectsList () {
        List <Project__c> getProjects = [
                SELECT  Name,
                        Balance__c,
                        Progress__c,
                        Target__c,
                        DaysLeft__c,
                        EndDate__c,
                        Wallet__r.Name,
                        Wallet__c

                FROM    Project__c
                ORDER BY Target__c];
        return  getProjects;



    }
}