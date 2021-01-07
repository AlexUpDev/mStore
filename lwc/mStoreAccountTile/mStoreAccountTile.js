import { LightningElement, api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class MStoreAccountTile extends NavigationMixin(LightningElement){

    @api account;
    roundedBalance = 0;
    

    connectedCallback() {
        this.roundedBalance = Math.round(this.account.Balance__c);
    }

    newIncome() {
        //this.createEvent('income');
        this.newOperation('income');
    }

    newExpense() {
        //this.createEvent('expense');
        this.newOperation('expense');
    }

    newOperation(type) {
        let operation = {account: this.account, type: type};
        const event = new CustomEvent('newoperation', {
            // detail contains only primitives
            detail: operation
        });
        // Fire the event from c-tile
        this.dispatchEvent(event);

    }

    /*
    navigateToOperation(type) {
        let componentDetails = {
            componentDef: 'c:mStoreNewOperation',
            attributes: {
                operation: type,
                walletId: this.account.Id,
                walletCurrency: this.account.Currency__c
            }
        };
        // Base64 encode the compDefinition JS object
        let encodedComponentDetails = btoa(JSON.stringify(componentDetails));
        this[NavigationMixin.Navigate]({
            type: 'standard__webPage',
            attributes: {
                url: '/one/one.app#' + encodedComponentDetails
            }
        });
    }
    */
}