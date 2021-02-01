import { LightningElement, api } from 'lwc';
import PlanesPictures from '@salesforce/resourceUrl/Jets';
export default class Tile extends LightningElement {
    @api plane;
   
    image = '';

    connectedCallback() {
        let imageUrl = PlanesPictures + '/Jets/' + this.plane.Manufacture__c + this.plane.Model__c;
        if (this.plane.Modification__c != undefined) {
            imageUrl += "-" + this.plane.Modification__c;
        }
        imageUrl += '.jpg';
        this.image = imageUrl;
    }
    tileClick() {
        const event = new CustomEvent('tileclick', {
            // detail contains only primitives
            detail: this.plane
        });
        // Fire the event from c-tile
        this.dispatchEvent(event);

    }
}