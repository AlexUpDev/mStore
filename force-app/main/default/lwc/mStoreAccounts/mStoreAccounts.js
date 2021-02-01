import { LightningElement, api } from 'lwc';
export default class MStoreAccounts extends LightningElement {
    
    @api accounts;

    handleNewOperation(evt) {
        const event = new CustomEvent('newoperation', {
            detail: evt.detail
        });
        this.dispatchEvent(event);
    }
}