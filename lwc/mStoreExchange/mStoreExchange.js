import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import saveOperations from '@salesforce/apex/MStoreController.saveOperations';

export default class MStoreExchange extends LightningElement {

    accounts = '';
    accountsNames = [];
    valueSell = 'Общий';
    valueBuy = 'Общий USD';

    accountSell = '';
    accountBuy = '';

    amountSell = '';
    amountBuy = '';

    currencySell = 'BYN';
    currencyBuy = 'USD';



    calculateAccountsNames() {
        for (let i=0;i<this.accounts.length;i++) {
            let option = {label: this.accounts[i].Name, value: this.accounts[i].Name};
            this.accountsNames.push(option);

        }
    }

    setAccountAndCurrency(accountName, type) {
        for (let i=0;i<this.accounts.length;i++) {
            if (this.accounts[i].Name === accountName) {
                if (type === 'sell') {
                    this.accountSell = this.accounts[i].Id;
                    this.currencySell = this.accounts[i].Currency__c;
                } else if (type === 'buy'){
                    this.accountBuy = this.accounts[i].Id;
                    this.currencyBuy = this.accounts[i].Currency__c;
                }
                break;
            }
        }
    }

    handleSellAccount(event) {
        this.setAccountAndCurrency(event.detail.value,'sell');
    }

    handleBuyAccount(event) {
        this.setAccountAndCurrency(event.detail.value,'buy');
    }

    handleSellAmount(event) {
        if (!event.target.value.includes('+') && !event.target.value.includes('-')) {
            let amount = event.target.value;
            if (amount.includes('.')) {
                amount = amount.replace('.', ',');
            }
            this.amountSell = amount;
        } 
    }

    handleBuyAmount(event) {
        if (!event.target.value.includes('+') && !event.target.value.includes('-')) {
            let amount = event.target.value;
            if (amount.includes('.')) {
                amount = amount.replace('.', ',');
            }
            this.amountBuy = amount;
        } 
    }

    handleBack() {
        this.returnToMenu();
    }

    handleSave() {
        this.preSaveCheck();    
    }

    returnToMenu() {
        const event = new CustomEvent('returntomenu', {});
        this.dispatchEvent(event);
    }

    preSaveCheck() {
        if (this.currencyBuy === this.currencySell) {
            this.fireMassage('Error', 'Валюты продажи и покупки совпадают');
        }
        if (this.amountSell === '') {
            this.fireMassage('Error', 'Проверьте сумму продажи');
        }
        if (this.amountBuy === '') {
            this.fireMassage('Error', 'Проверьте сумму покупки');
        }

        if (this.currencyBuy !== this.currencySell &&
            this.amountSell !== '' && this.amountBuy !== '') 
        {
            this.createAndSaveOperations();    
        }
    }

    createAndSaveOperations() {

        let operations = [];

        let expense = { 'sobjectType': 'Expense__c' };
        expense.ValletId__c  = this.accountSell;
        expense.Name = 'Продажа ' + this.currencySell;
        expense.Category__c = 'Обмен валюты'; 
        expense.Value__c = this.amountSell;

        operations.push(expense);

        let income = { 'sobjectType': 'Reciept__c' };
        income.ValletId__c  = this.accountBuy;
        income.Name = 'Покупка  ' + this.currencyBuy;
        income.Category__c = 'Обмен валюты'; 
        income.Value__c = this.amountBuy;

        operations.push(income);

        saveOperations({operations : operations}).then((resp)=>{
            this.fireMassage('success', 'Обмен валюты сохранен');
            this.returnToMenu();
        }).catch((err) => {
            this.fireMassage('error', 'Ошибка при сохранении обмена валюты');
        });


    }

    fireMassage(variant, message) {
        
        const event = new ShowToastEvent({
            variant: variant,
            message: message,
        });
        this.dispatchEvent(event);
    }

    set accountsList(value) {
        this.setAttribute('accountsList', value);
        this.accounts = value;
        if (this.accounts != '') {
            this.calculateAccountsNames();
        }
        this.setAccountAndCurrency(this.valueSell, 'sell');
        this.setAccountAndCurrency(this.valueBuy, 'buy');     
    }

    @api get accountsList() {
        return this.accountsList;
    }

}