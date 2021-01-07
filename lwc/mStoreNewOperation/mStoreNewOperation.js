import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveOperations from '@salesforce/apex/MStoreSaveOperations.saveOperations';


export default class MStoreNewOperation extends LightningElement {
    type = undefined;
    descriptionRus = undefined;
    @api account = '';
    category = '';
    categories = '';
    showDatePicker = false;
    operationDate = '';
    operationAmount = '';
    name = '';

    calculateCategories() {     
        if (this.type === 'expense') {
        this.categories = [
            { label: 'Продукты', value: 'Продукты' },
            { label: 'Непродуктовые', value: 'Непродуктовые' },
            { label: 'Услуги', value: 'Услуги' },
            { label: 'Здоровье', value: 'Здоровье' },
            { label: 'Образование', value: 'Образование' },
            { label: 'Транспорт', value: 'Транспорт' },
            { label: 'Другие', value: 'Другие' }
        ];
        } else if (this.type === 'income') {
            this.categories =  [
            { label: 'Зарплата', value: 'Зарплата' },
            { label: 'Детские', value: 'Детские' },
            { label: 'Подарок', value: 'Подарок' },
           { label: 'Другие', value: 'Другие' }
        ];
        }
    }

    calculateDescriptionRus() {
        if (this.type === 'income') {
            this.descriptionRus = 'Новый доход';        
        } else if (this.type === 'expense') {
            this.descriptionRus = 'Новый расход';
        } 
    }

    handleSelectCategory(event) {
        this.category = event.detail.value;
    }

    handleNameChange(event) {
        this.name = event.target.value;
        console.log('name:' + this.name);
    }

    handleAmountChange(event) {
       
        if (!event.target.value.includes('+') && !event.target.value.includes('-')) {
            let amount = event.target.value;
            if (amount.includes('.')) {
                amount = amount.replace('.', ',');
            }
            this.operationAmount = amount;
        } else {
            this.fireMassage('error', 'Проверьте введенную сумму');
        }
    }

    switchDatePicker(event) {
        this.showDatePicker = !event.target.checked;
        this.operationDate = '';
    }

    handleDateChange(event) {
        let today = new Date().toISOString().slice(0, 10)
        if (event.target.value <= today) {
            this.operationDate = event.target.value;
        } else {
            this.fireMassage('error', 'Проверьте введенную дату');
        }
    }

    handleBack() {
        this.returnToMenu();
    }

    handleSave() {
        if (this.type === 'income') {
            this.constructIncome();
        } else if (this.type === 'expense') {
            this.constructExpense();
        }
    }

    constructIncome() {
        let income = { 'sobjectType': 'Reciept__c' };
        income.ValletId__c  = this.account.Id;
        if (this.name != '') {
            income.Name = this.name;
        } else {
            income.Name = this.descriptionRus;
        }
        if (this.category != '') {
            income.Category__c = this.category
        } else {
            this.fireMassage('error', 'Выберите категорию');
        }
        if (this.operationAmount != '') {
            income.Value__c = this.operationAmount;
        } else {
            this.fireMassage('error', 'Введите сумму');
        }
        if (this.operationDate != '') {
            income.Receipt_Date__c = this.operationDate;
        }
        if (income.Category__c != null && income.Value__c != null) {
            let operations = [];
            operations.push(income);
            saveOperations({operations : operations}).then((resp)=>{
                this.fireMassage('success', 'Доход добавлен');
                this.returnToMenu();
            }).catch((err) => {
                this.fireMassage('error', 'Ошибка при сохранении дохода');
            });
        }
    }

    constructExpense() {
        let expense = { 'sobjectType': 'Expense__c' };
        expense.ValletId__c  = this.account.Id;
        if (this.name != '') {
            expense.Name = this.name;
        } else {
            expense.Name = this.descriptionRus;
        }
        if (this.category != '') {
            expense.Category__c = this.category
        } else {
            this.fireMassage('error', 'Выберите категорию');
        }
        if (this.operationAmount != '') {
            expense.Value__c = this.operationAmount;
        } else {
            this.fireMassage('error', 'Введите сумму');
        }
        if (this.operationDate != '') {
            expense.Receipt_Date__c = this.operationDate;
        }

        if (expense.Category__c != null && expense.Value__c != null) {
            let operations = [];
            operations.push(expense);
            saveOperations({operations : operations}).then((resp)=>{
                this.fireMassage('success', 'Расход добавлен');
                this.returnToMenu();
            }).catch((err) => {
                this.fireMassage('error', 'Ошибка при сохранении расхода');
            });
        }


    }

    returnToMenu() {
        const event = new CustomEvent('returntomenu', {});
        this.dispatchEvent(event);
    }

    fireMassage(variant, message) {
        
        const event = new ShowToastEvent({
            variant: variant,
            message: message,
        });
        this.dispatchEvent(event);
    }

    set operation(value) {
        this.setAttribute('operation', value);
        this.type = value;
        if (this.type != undefined) {
            this.calculateDescriptionRus();
            this.calculateCategories();
        }  
    }

    @api get operation() {
        return this.operation;
    }
}