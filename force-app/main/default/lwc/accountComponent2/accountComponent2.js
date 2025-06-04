import { LightningElement, wire, api, track } from 'lwc';
import getdetaillist from '@salesforce/apex/accountRecords.getdetaillist';

export default class accountComponent2 extends LightningElement {
    @api records
    isShow = false
    childTrue = true
    @track dataRow
    @track totalRecords
    @track columns = [];
    contacteditShow
    @wire(getdetaillist, { reid: '$records' })
    connAccount
    connectedCallback() {
        this.columns = [{
            label: 'Name',
            fieldName: 'Name'
        }

        ];
    }
    handleClick(event) {
        this.isShow = true
        this.dispatchEvent(new CustomEvent('update', {
            detail: {
                records: this.childTrue
            }
        }))
    }
    contactEditUpdate(event) {
        this.contacteditShow = event.datail.records
    }
    cancelHandler(event) {
        console.log(event.detail.editShow)
        this.isShow = event.detail.editShow
    }
}