public with sharing class FinGuardWalletsController {
        @AuraEnabled
        public static List<Wallet__c> getWalletsList () {
                List <Wallet__c> getWallets = [
                    SELECT  Name, Balance__c, Total_Expenses__c, Total_Receipts__c, Monetary_Unit__c, Currency__c, CreatedDate
                    FROM    Wallet__c
                ];
                return  getWallets;



        }

    }