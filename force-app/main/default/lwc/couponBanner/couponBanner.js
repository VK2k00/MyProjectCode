import { LightningElement, wire, track, api } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import { getRecord, updateRecord, createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import TYPE_FIELD from '@salesforce/schema/Account.Type';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import EXPIRATION_DATE_FIELD from '@salesforce/schema/Account.Expiration_date__c';

const FIELDS = [NAME_FIELD, TYPE_FIELD, INDUSTRY_FIELD, PHONE_FIELD, EXPIRATION_DATE_FIELD];

export default class CouponBanner extends LightningElement {
    @api recordId;

    @track showForm = false;
    @track isEditing = false;
    @track accountData = {
        Name: '',
        Type: '',
        Industry: '',
        Phone: '',
        Expiration_date__c: ''
    };

    @track typeOptions = [];
    @track industryOptions = [];

    // Get object info to fetch recordTypeId (required for picklist)
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    // Type picklist values
    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: TYPE_FIELD
    })
    wiredTypeValues({ data, error }) {
        if (data) {
            this.typeOptions = data.values.map(item => ({
                label: item.label,
                value: item.value
            }));
        }
    }

    // Industry picklist values
    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: INDUSTRY_FIELD
    })
    wiredIndustryValues({ data, error }) {
        if (data) {
            this.industryOptions = data.values.map(item => ({
                label: item.label,
                value: item.value
            }));
        }
    }

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredAccount({ error, data }) {
        if (data) {
            this.accountData = {
                Name: data.fields.Name.value || '',
                Type: data.fields.Type.value || '',
                Industry: data.fields.Industry.value || '',
                Phone: data.fields.Phone.value || '',
                Expiration_date__c: data.fields.Expiration_date__c.value || ''
            };
        } else if (error) {
            console.error('Error loading account', error);
            this.accountData = {
                Name: '',
                Type: '',
                Industry: '',
                Phone: '',
                Expiration_date__c: ''
            };
        }
    }

    get buttonText() {
        return this.showForm ? 'CLOSE FORM' : 'OPT IN HERE';
    }

    handleOptIn() {
        this.showForm = !this.showForm;
        this.isEditing = !this.recordId;
    }

    handleInputChange(event) {
        const field = event.target.dataset.field;
        this.accountData = { ...this.accountData, [field]: event.target.value };
    }

    handleSave() {
        if (this.recordId) {
            this.updateAccount();
        } else {
            this.createAccount();
        }
    }

    updateAccount() {
        const fields = {
            Id: this.recordId,
            [NAME_FIELD.fieldApiName]: this.accountData.Name,
            [TYPE_FIELD.fieldApiName]: this.accountData.Type,
            [INDUSTRY_FIELD.fieldApiName]: this.accountData.Industry,
            [PHONE_FIELD.fieldApiName]: this.accountData.Phone,
            [EXPIRATION_DATE_FIELD.fieldApiName]: this.accountData.Expiration_date__c
        };

        updateRecord({ fields })
            .then(() => {
                this.showToast('Success', 'Account updated successfully', 'success');
                this.isEditing = false;
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    createAccount() {
        const fields = {
            [NAME_FIELD.fieldApiName]: this.accountData.Name,
            [TYPE_FIELD.fieldApiName]: this.accountData.Type,
            [INDUSTRY_FIELD.fieldApiName]: this.accountData.Industry,
            [PHONE_FIELD.fieldApiName]: this.accountData.Phone,
            [EXPIRATION_DATE_FIELD.fieldApiName]: this.accountData.Expiration_date__c
        };

        createRecord({ apiName: ACCOUNT_OBJECT.objectApiName, fields })
            .then(account => {
                this.recordId = account.id;
                this.showToast('Success', 'Account created successfully', 'success');
                this.isEditing = false;
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }

    handleCancel() {
        if (this.recordId && this.wiredAccount.data) {
            this.accountData = {
                Name: this.wiredAccount.data.fields.Name.value || '',
                Type: this.wiredAccount.data.fields.Type.value || '',
                Industry: this.wiredAccount.data.fields.Industry.value || '',
                Phone: this.wiredAccount.data.fields.Phone.value || '',
                Expiration_date__c: this.wiredAccount.data.fields.Expiration_date__c.value || ''
            };
        } else {
            this.accountData = {
                Name: '',
                Type: '',
                Industry: '',
                Phone: '',
                Expiration_date__c: ''
            };
        }
        this.isEditing = false;
    }

    handleEdit() {
        this.isEditing = true;
    }
}