import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/MStoreController.getAccounts';
export default class MStoreMenu extends LightningElement {

    //general options
    mode = '';
    info = '';
    currency = 'BYN';
    accounts;

    //new operation options
    account = '';
    operation = '';

    //display options
    showMenu = true;
    showCreateOperation = false;
    showExchange = false;
    showAudit = false;

    get options() {
        return [
            { label: 'Обмен $', value: 'Обмен $' },
            { label: 'Расходы', value: 'Расходы' },
            { label: 'Доходы', value: 'Доходы' },
            { label: 'Аудит', value: 'Аудит' }
        ];
    }

    getAccounts() {
        getAccounts().then(accounts => {
            this.accounts = accounts;
            this.calculateInfo();
        })
    }

    connectedCallback() {      
        this.getAccounts();    
    }

    handleChangeCurrency() {
        let newCurrency = '';
        switch (this.currency) {
            case 'BYN':
                newCurrency = 'USD';
                break;
            case 'USD':
                newCurrency = 'EUR';
                break;
            case 'EUR':
                newCurrency = 'BYN';
                break;
        }
        this.currency = newCurrency;
        this.calculateInfo();
    }

    displayMainMenu() {
        this.accounts = '';
        this.getAccounts();
        this.showMenu = true;
        this.showCreateOperation = false;
        this.showExchange = false;
        this.showAudit = false;
        
    }

    calculateInfo() {
        let total = 0;
        for (let i=0;i<this.accounts.length;i++) {
            if (this.accounts[i].Currency__c == this.currency) {
                total += this.accounts[i].Balance__c;
            }
        }
        this.info = 'Всего: ' + Math.round(total);
    } 

    startSelectedMode() {
        if (this.mode == 'Обмен $') {
            this.showMenu = false;
            this.showExchange = true;
        } else if (this.mode == 'Аудит') {
            this.showMenu = false;
            this.showAudit = true;
        }
    }
    
    handleChangeMode(event) {
        this.mode = event.detail.value;
        this.startSelectedMode();

    }

    handleNewOperation(evt) {
        this.account = evt.detail.account;
        this.operation = evt.detail.type;
        this.showMenu = false;
        this.showCreateOperation = true;
    }
}