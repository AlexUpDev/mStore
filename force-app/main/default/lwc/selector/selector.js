import { LightningElement } from 'lwc';
export default class Selector extends LightningElement {
    plane;
    modelFilter = 'All Models';

    get options() {
        return [
            { label: 'All Models', value: 'All Models' },
            { label: 'Boeing 707', value: '707' },
            { label: 'Boeing 717', value: '717' },
            { label: 'Boeing 727', value: '727' },
            { label: 'Boeing 737', value: '737' },
            { label: 'Boeing 747', value: '747' },
            { label: 'Boeing 757', value: '757' },
            { label: 'Boeing 767', value: '767' },
            { label: 'Boeing 777', value: '777' },
            { label: 'Boeing 787', value: '787' }
        ];
    }

    handleChangeModel(event) {
        this.modelFilter = event.detail.value;
        this.plane = undefined;
    }

    handlePlaneSelected(evt) {
        this.plane = evt.detail;
    }
}