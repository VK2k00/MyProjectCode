import { LightningElement,wire } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import ACCOUNT_INFO from '@salesforce/schema/Account';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
export default class GetPicklistValueDemo extends LightningElement {
    picklistvalue
    @wire(getObjectInfo, {objectApiName:ACCOUNT_INFO })
    objectInfo


    @wire(getPicklistValues,{recordTypeId: '$objectInfo.data.defaultRecordTypeId', fieldApiName:INDUSTRY_FIELD})
     industryPicklistValue

     handleChange(event){
        this.picklistvalue = event.target.value;

     }
}