import { LightningElement, api } from 'lwc';
import getPlanes from '@salesforce/apex/PlanesController.getPlanes';
export default class List extends LightningElement {
    
    planes;
    sortedPlanes;
    filter = undefined;

    connectedCallback() {      
        getPlanes().then(planes => {
            this.planes = planes;
            this.sortedPlanes = planes;
        })
    }

    handleTileClick(evt) {
        // This component wants to emit a productselected event to its parent
        const event = new CustomEvent('planeselected', {
            detail: evt.detail
        });
        // Fire the event from c-list
        this.dispatchEvent(event);
    }

    set modelFilter(value) {

        this.setAttribute('modelFilter', value);
        this.filter = value;
        this.filterPlanes();
    }

    filterPlanes() {
        if (this.planes != undefined) {
            if (this.filter === "All Models") {
                this.sortedPlanes = this.planes;
            } else {
                this.sortedPlanes = [];
                for (let i=0;i<this.planes.length;i++) {
                    if (this.planes[i].Model__c === this.filter) {
                        this.sortedPlanes.push(this.planes[i]);
                    }
                }
            }       
        }
    }

    @api get modelFilter() {
        return this.modelFilter;
    }
}