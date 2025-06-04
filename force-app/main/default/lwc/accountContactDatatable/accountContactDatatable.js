import { LightningElement, wire } from 'lwc';
import getAccountWithContacts from '@salesforce/apex/AccountContactsController.getAccountWithContacts';

export default class AccountContactDatatable extends LightningElement {
    data = [];
    columns = [
        { label: 'Account Name', fieldName: 'accountName' },
        { label: 'Contact Name', fieldName: 'contactName' },
        { label: 'Email', fieldName: 'email' }
    ];

    @wire(getAccountWithContacts)
    wiredAccounts({ error, data }) {
        if (data) {
            let accountData = [];
            data.forEach(account => {
                account.contacts.forEach(contact => {
                    accountData.push({
                        accountName: account.accountName,
                        contactName: `${contact.FirstName} ${contact.LastName}`,
                        email: contact.Email,
                        id: contact.Id
                    });
                });
            });
            this.data = accountData;
        } else if (error) {
            console.error(error);
        }
    }
}