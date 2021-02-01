import { LightningElement, wire } from 'lwc';
import getPlanes from '@salesforce/apex/PlanesController.getPlanes';
//export const planes = [
//    {"apiName":"Plane__c","childRelationships":{},"fields":{"EnginesQuantity__c":{"displayValue":"4 engines","value":"4 engines"},"CreatedDate":{"displayValue":null,"value":"2018-10-09T03:29:52.000Z"},"Description__c":{"displayValue":null,"value":"Is a long-range narrow-body airliner produced by Boeing Commercial Airplanes, its first jetliner. "},"Id":{"displayValue":null,"value":"a0256000001F1arAAC"},"LastModifiedDate":{"displayValue":null,"value":"2018-10-12T02:57:48.000Z"},"Seats__c":{"displayValue":"174 seats","value":"174 seats"},"StartYear__c":{"displayValue":"1957","value":1957},"Range__c":{"displayValue":"5600km","value":"5600km"},"Name":{"displayValue":null,"value":"Boeing 707-120"},"Picture_URL__c":{"displayValue":null,"value":""},"SystemModstamp":{"displayValue":null,"value":"2018-10-12T02:57:48.000Z"}},"id":"a0256000001F1arAAC","lastModifiedById":null,"lastModifiedDate":"2018-10-12T02:57:48.000Z","recordTypeInfo":null,"systemModstamp":"2018-10-12T02:57:48.000Z"},
//    {"apiName":"Plane__c","childRelationships":{},"fields":{"EnginesQuantity__c":{"displayValue":"3 engines","value":"3 engines"},"CreatedDate":{"displayValue":null,"value":"2018-10-09T03:29:52.000Z"},"Description__c":{"displayValue":null,"value":"Was designed to service smaller airports with shorter runways than those used by Boeing 707s"},"Id":{"displayValue":null,"value":"a0256000001F1atAAC"},"LastModifiedDate":{"displayValue":null,"value":"2018-10-10T17:26:47.000Z"},"Seats__c":{"displayValue":"125 seats","value":"125 seats"},"StartYear__c":{"displayValue":"1962","value":1962},"Range__c":{"displayValue":"4170km","value":"4170km"},"Name":{"displayValue":null,"value":"Boeing 727-200"},"Picture_URL__c":{"displayValue":null,"value":""},"SystemModstamp":{"displayValue":null,"value":"2018-10-10T17:26:47.000Z"}},"id":"a0256000001F1atAAC","lastModifiedById":null,"lastModifiedDate":"2018-10-10T17:26:47.000Z","recordTypeInfo":null,"systemModstamp":"2018-10-10T17:26:47.000Z"},
//    {"apiName":"Plane__c","childRelationships":{},"fields":{"EnginesQuantity__c":{"displayValue":"2 engines","value":"2 engines"},"CreatedDate":{"displayValue":null,"value":"2018-10-09T03:29:52.000Z"},"Description__c":{"displayValue":null,"value":"Developed to supplement the Boeing 727 on short and thin routes, the twinjet retains the 707 fuselage cross-section and nose with two underwing turbofans."},"Id":{"displayValue":null,"value":"a0256000001F1auAAC"},"LastModifiedDate":{"displayValue":null,"value":"2018-10-09T04:37:56.000Z"},"Seats__c":{"displayValue":"103 seats","value":"103 seats"},"StartYear__c":{"displayValue":"1967","value":1967},"Range__c":{"displayValue":"2850km","value":"2850km"},"Name":{"displayValue":null,"value":"Boeing 737-100"},"Picture_URL__c":{"displayValue":null,"value":""},"SystemModstamp":{"displayValue":null,"value":"2018-10-09T04:37:56.000Z"}},"id":"a0256000001F1auAAC","lastModifiedById":null,"lastModifiedDate":"2018-10-09T04:37:56.000Z","recordTypeInfo":null,"systemModstamp":"2018-10-09T04:37:56.000Z"},
//    {"apiName":"Plane__c","childRelationships":{},"fields":{"EnginesQuantity__c":{"displayValue":"4 engines","value":"4 engines"},"CreatedDate":{"displayValue":null,"value":"2018-10-09T03:29:52.000Z"},"Description__c":{"displayValue":null,"value":"is a large, long–range wide-body airliner and cargo aircraft,the first twin aisle airliner. "},"Id":{"displayValue":null,"value":"a0256000001F1avAAC"},"LastModifiedDate":{"displayValue":null,"value":"2018-10-09T03:29:52.000Z"},"Seats__c":{"displayValue":"366 seats","value":"366 seats"},"StartYear__c":{"displayValue":"1969","value":1969},"Range__c":{"displayValue":"8560km","value":"8560km"},"Name":{"displayValue":null,"value":"Boeing 747-100"},"Picture_URL__c":{"displayValue":null,"value":""},"SystemModstamp":{"displayValue":null,"value":"2018-10-09T03:29:52.000Z"}},"id":"a0256000001F1avAAC","lastModifiedById":null,"lastModifiedDate":"2018-10-09T03:29:52.000Z","recordTypeInfo":null,"systemModstamp":"2018-10-09T03:29:52.000Z"},
    
//];
export default class Data extends LightningElement {
    @wire(getPlanes)
    planes;
    // connectedCallback() {    
    //     console.log('Planes: ', this.planes);
    // }
}