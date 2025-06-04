import { LightningElement, wire, api } from 'lwc';
import getAccountContacts from '@salesforce/apex/AccountContactsController.getAccountContacts';

export default class AccountContactList extends LightningElement {
    @api recordId;  // This will be used to pass the Account Id from the record page

    contacts = [];
    columns = [
        { label: 'Contact Name', fieldName: 'Name' },
        { label: 'Phone', fieldName: 'Phone' },
        { label: 'Title', fieldName: 'Title' }
    ];

    @wire(getAccountContacts, { accountId: '$recordId' })
    wiredContacts({ error, data }) {
        if (data) {
            this.contacts = data;
        } else if (error) {
            // Handle error
            console.error(error);
        }
    }
}