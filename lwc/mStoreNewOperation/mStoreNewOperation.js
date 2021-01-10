import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getCategoriesOptions from '@salesforce/apex/MStoreController.getCategoriesOptions';
import saveOperations from '@salesforce/apex/MStoreController.saveOperations';


export default class MStoreNewOperation extends LightningElement {
    type = undefined;
    descriptionRus = undefined;
    @api account = '';
    category = '';
    categories = '';
    subCategory = '';
    defaultSubCategory = '';
    subCategories = [];
    subCategoriesAll = new Map();;
    showSubCategories = false;
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
            { label: 'Транспорт', value: 'Транспорт' },
            { label: 'Недвижимость', value: 'Недвижимость' },
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
        let subCategoriesArray = [];
        for (let key of Object.keys(this.subCategoriesAll)) {
            if (this.category === key) {
                subCategoriesArray = this.subCategoriesAll[key];
                break;
            }
        }
        if (subCategoriesArray.length > 0) {
            this.defaultSubCategory = subCategoriesArray[0];
            for (let subCategory of subCategoriesArray) {
                this.subCategories.push({label: subCategory, value: subCategory});
            }
            this.showSubCategories = true;
        } else {
            this.showSubCategories = false;
        }
    }

    handleSelectSubCategory(event) {
        this.subCategory = event.detail.value;
    }

    handleNameChange(event) {
        this.name = event.target.value;
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
        if (this.defaultSubCategory != '') {
            if (this.subCategory != '') {
                expense.SubCategory__c = this.subCategory;
            } else {
                expense.SubCategory__c = this.defaultSubCategory;
            }
        }
        if (this.operationAmount != '') {
            expense.Value__c = this.operationAmount;
        } else {
            this.fireMassage('error', 'Введите сумму');
        }
        if (this.operationDate != '') {
            expense.Expense_Date__c = this.operationDate;
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
            if (this.type === 'expense') {
                this.getCategoriesOptions();  
            }
            
        }  
    }

    @api get operation() {
        return this.operation;
    }

    getCategoriesOptions() {
        getCategoriesOptions().then(response => {
            this.subCategoriesAll = response;
        })
    }
}