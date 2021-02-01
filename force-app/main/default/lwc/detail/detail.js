import { LightningElement, api } from 'lwc';
import PlanesPictures from '@salesforce/resourceUrl/Jets';
export default class Detail extends LightningElement {
    plane = undefined;
    picture ="";
    boeingLogo = PlanesPictures + '/Jets/BoeingLogo.png';
    set planeValue(value) {
        this.setAttribute('planeValue', value);
        this.plane = value;
        if (this.plane) {
            let imageUrl = PlanesPictures + '/Jets/' + this.plane.Manufacture__c + this.plane.Model__c;
            if (this.plane.Modification__c != undefined) {
                imageUrl += "-" + this.plane.Modification__c;
            }
            imageUrl += '.jpg';
            this.picture = imageUrl;
       }
    }

    @api get planeValue() {
        return this.planeValue;
    }
}