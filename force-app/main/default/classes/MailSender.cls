/**
 * Created by aleksejuporojskij on 12/26/19.
 */
public with sharing class  MailSender {
    @AuraEnabled
        public static string processEmail(String email, String subject, String message){
            String sMessage;
            try{
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                String[] toAddresses = new String[] {email};
                mail.setToAddresses(toAddresses);
                mail.setSubject(subject);
                mail.setHtmlBody(message);
                mail.setCharset('UTF-8');
                Messaging.SendEmailResult [] results = Messaging.sendEmail(new Messaging.SingleEmailMessage[] {mail});
                sMessage='Success';
            }
            catch(Exception ex){
                sMessage='Fail';
            }
            return sMessage;
        }
    }