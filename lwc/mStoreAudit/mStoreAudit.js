import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveOperations from '@salesforce/apex/MStoreSaveOperations.saveOperations';

export default class MStoreAudit extends LightningElement {

    accounts = '';

    currencies = ['BYN', 'USD', 'EUR'];

    initialBYN = 0;
    initialUSD = 0;
    initialEUR = 0;

    factBYN = 0;
    factUSD = 0;
    factEUR = 0;

    differenceBYN = 0;
    differenceUSD = 0;
    differenceEUR = 0;

    accountNameBYN = 'Общий';
    accountNameUSD = 'Общий USD';
    accountNameEUR = 'Общий EUR';

    accountBYN = '';
    accountUSD = '';
    accountEUR = '';

    operationsDetails = [];

    handleAddBYN() {
        let value = this.template.querySelector("input[data-my-id=amountInputByn]").value;
        if (!value.includes('+') && !value.includes('-')) {
            if (value.includes(',')) {
                value = value.replace(',', '.');
            }
            let floatValue = parseFloat(value);
            let roundenValue = Math.round(floatValue*100)/100;
            let updatedBYN = Math.round((this.factBYN + roundenValue)*100)/100;
            this.factBYN = updatedBYN;

            this.updateDifference('BYN');
        } else {
            this.fireMassage('error', 'Проверьте введенную сумму(BYN)');    
        }
    }

    handleAddUSD() {
        let value = this.template.querySelector("input[data-my-id=amountInputUsd]").value;
        if (!value.includes('+') && !value.includes('-')) {
            if (value.includes(',')) {
                value = value.replace(',', '.');
            }
            let floatValue = parseFloat(value);
            let roundenValue = Math.round(floatValue*100)/100;
            let updatedUSD = Math.round((this.factUSD + roundenValue)*100)/100;
            this.factUSD = updatedUSD;

            this.updateDifference('USD');
        } else {
            this.fireMassage('error', 'Проверьте введенную сумму(USD)');
        }
    }
    
    handleAddEUR() {
        let value = this.template.querySelector("input[data-my-id=amountInputEur]").value;
        if (!value.includes('+') && !value.includes('-')) {
            if (value.includes(',')) {
                value = value.replace(',', '.');
            }
            let floatValue = parseFloat(value);
            let roundenValue = Math.round(floatValue*100)/100;
            let updatedEUR = Math.round((this.factEUR + roundenValue)*100)/100;
            this.factEUR = updatedEUR;

            this.updateDifference('EUR');
        } else {
            this.fireMassage('error', 'Проверьте введенную сумму(EUR)');
        }
    }

    handleBack() {
        this.returnToMenu();
    }

    handleSave() {
        console.log('Starting save');
        this.createAndSaveOperations();
    }

    returnToMenu() {
        const event = new CustomEvent('returntomenu', {});
        this.dispatchEvent(event);
    }

    createAndSaveOperations() {

        let operations = [];

        this.createOperationDetails('BYN', this.accountBYN, this.differenceBYN);
        this.createOperationDetails('USD', this.accountUSD, this.differenceUSD);
        this.createOperationDetails('EUR', this.accountEUR, this.differenceEUR);

        for (let operationDetails of this.operationsDetails) {
            console.log('op dif: ' + operationDetails.difference);
            if (operationDetails.difference > 0) {
                let expense = { 'sobjectType': 'Expense__c' };
                expense.ValletId__c  = operationDetails.account;
                expense.Name = 'Коррекция -';
                expense.Category__c = 'Ревизия'; 
                expense.Value__c = operationDetails.differenceString;

                operations.push(expense);

            } else {
                let income = { 'sobjectType': 'Reciept__c' };
                income.ValletId__c  = operationDetails.account;
                income.Name = 'Коррекция +';
                income.Category__c = 'Ревизия'; 
                income.Value__c = operationDetails.differenceString;

                operations.push(income);
            }
        }
        if (operations.length > 0) {     
            saveOperations({operations : operations}).then((resp)=>{
                this.fireMassage('success', 'Ревизия завершена');
                this.returnToMenu();
            }).catch((err) => {
                this.fireMassage('error', 'Ошибка при сохранении');
            });
        }
    }

    setAccounts() {
        for (let account of this.accounts) {    
            switch (account.Name) {
                case this.accountNameBYN:
                    this.accountBYN = account.Id;
                    break;
                case this.accountNameUSD:
                    this.accountUSD = account.Id;
                    break;
                case this.accountNameEUR:
                    this.accountEUR = account.Id;
                    break;
            }   
        }
    }

    updateDifference(currency) {
        switch (currency) {
            case 'BYN':
                this.differenceBYN = Math.round((this.initialBYN - this.factBYN)*100)/100;
                break;
            case 'USD':
                this.differenceUSD =Math.round((this.initialUSD - this.factUSD)*100)/100;
                break;
            case 'EUR':
                this.differenceEUR = Math.round((this.initialEUR - this.factEUR)*100)/100;
                break;
        }    
    }

    calculateInitialBalance() {
        for (let currency of this.currencies) {
            let totalInitial = 0;
            for (let a of this.accounts) {
                if (a.Currency__c == currency) {
                    totalInitial += a.Balance__c;
                }
            }
            let roundedInitial = totalInitial.toFixed(2);
            switch (currency) {
                case 'BYN':
                    this.initialBYN = roundedInitial;
                    break;
                case 'USD':
                    this.initialUSD = roundedInitial;
                    break;
                case 'EUR':
                    this.initialEUR = roundedInitial;
                    break;
            }
            this.updateDifference(currency);
        } 
    }

    fireMassage(variant, message) {
        
        const event = new ShowToastEvent({
            variant: variant,
            message: message,
        });
        this.dispatchEvent(event);
    }

    createOperationDetails(currency, account, difference) {
        if (difference != 0) {          
            let stringDifference = difference.toString();
            if (stringDifference.includes('.')) {
                stringDifference = stringDifference.replace('.', ',');
            }
            if (stringDifference.includes('-')) {
                stringDifference = stringDifference.substring(1);
            }
            let object = {currency: currency, account: account, difference: difference, differenceString : stringDifference};
            this.operationsDetails.push(object);
        }
    }

    set accountsList(value) {
        this.setAttribute('accountsList', value);
        this.accounts = value;
        if (this.accounts != '') {
            this.calculateInitialBalance();
            this.setAccounts();
        }   
    }

    @api get accountsList() {
        return this.accountsList;
    }
}