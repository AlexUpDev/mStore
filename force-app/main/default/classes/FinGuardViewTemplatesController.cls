public class FinGuardViewTemplatesController {
@AuraEnabled
        public static List<Template__c> getTemplatesList () {
            List <Template__c> getTemplates = [
                    SELECT  Name,
                            Value__c,
                            Category__c,
                            Type__c,
                            Wallet__c

                    FROM    Template__c
            ];
            return  getTemplates;



        }
}