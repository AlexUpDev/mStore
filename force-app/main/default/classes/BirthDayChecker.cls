global class BirthDayChecker implements Schedulable {
    global void execute(SchedulableContext ctx) {
        Integer this_month = Date.today().month();
        List<Contact> contactListThisMonth = [
                SELECT Id, Name, Birthdate, Age__c, Vera__c
                FROM Contact
                WHERE CALENDAR_MONTH (Birthdate) = :this_month];
        List<Contact> contactListNextMonth = [
                SELECT Id, Name, Birthdate, Age__c, Vera__c
                FROM Contact
                WHERE CALENDAR_MONTH (Birthdate) = :(this_month+1)
        		AND DAY_IN_MONTH (Birthdate) = :1];
        List<Contact> contactList = contactListThisMonth;
        contactList.addAll(contactListNextMonth);
        Integer forToday = System.today().day();
        for (Contact contact : contactList) {
            Integer dayOfBirthday = contact.Birthdate.day();
            Integer monthOfBirthday = contact.Birthdate.month();
            if ((dayOfBirthday == forToday)&&(monthOfBirthday == this_month)){
                String email;
                if(contact.Vera__c != True){
                	email = 'a.uparoiski@gmail.com';
                }else{
                    email = 'verona210585@mail.ru';
                }
                String subject = 'Сегодня День Рождения у ' + contact.Name;
                String message = contact.Name +
                        ' сегодня исполняется ' + contact.Age__c + '. Не забудь поздравить!';
                MailSender.processEmail(email, subject, message);
                System.debug(message);
        }
        	if (dayOfBirthday == (forToday+1)){
                String email;
                if (contact.Vera__c != true){
                	email = 'a.uparoiski@gmail.com';
                } else {
                    email = 'verona210585@mail.ru';
                }
                String subject = 'Завтра День Рождения у ' + contact.Name;
               	String message = contact.Name +' завтра исполнится ' + (contact.Age__c+1) + '. Не забудь поздравить!';
                MailSender.processEmail(email, subject, message);
                System.debug(message);
        }
    }
}

}