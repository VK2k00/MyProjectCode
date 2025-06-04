import { LightningElement, track, wire } from 'lwc';
import getAccounts from '@salesforce/apex/CDCReportSummaryClass.getAccounts';
import updateAccountSummary from '@salesforce/apex/CDCReportSummaryClass.updateAccountSummary';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const PAGE_SIZE = 10;

export default class CdcReoprtSummary extends LightningElement {
    @track accounts = [];
    @track currentPage = 1;
    totalRecords;
    
    @wire(getAccounts, { pageNumber: '$currentPage', pageSize: PAGE_SIZE })
    wiredAccounts({ data, error }) {
        if (data) {
            this.accounts = data.map(account => ({
                Id: account.Id,
                Name: account.Name,
                Record_Summary__c: account.Record_Summary__c,
                isEditing: false
            }));
        } else if (error) {
            console.error('Error fetching accounts:', error);
        }
    }

    handleEdit(event) {
        const accountId = event.target.dataset.id;
        this.accounts = this.accounts.map(account => 
            account.Id === accountId ? { ...account, isEditing: true } : account
        );
    }

    handleCancel(event) {
        const accountId = event.target.dataset.id;
        this.accounts = this.accounts.map(account => 
            account.Id === accountId ? { ...account, isEditing: false } : account
        );
    }

    handleChange(event) {
        const accountId = event.target.dataset.id;
        const newSummary = event.target.value;
        this.accounts = this.accounts.map(account => 
            account.Id === accountId ? { ...account, Record_Summary__c: newSummary } : account
        );
    }

    handleSave(event) {
        const accountId = event.target.dataset.id;
        const updatedAccount = this.accounts.find(acc => acc.Id === accountId);

        updateAccountSummary({ recordId: accountId, summary: updatedAccount.Record_Summary__c })
            .then(result => {
                if (result === 'Success') {
                    this.accounts = this.accounts.map(account => 
                        account.Id === accountId ? { ...account, isEditing: false } : account
                    );
                    this.showToast('Success', 'Summary updated successfully!', 'success');
                } else {
                    this.showToast('Error', result, 'error');
                }
            })
            .catch(error => {
                console.error('Error updating summary:', error);
                this.showToast('Error', 'Failed to update summary', 'error');
            });
    }

    handleNextPage() {
        this.currentPage++;
    }

    handlePrevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
        }
    }

    showToast(title, message, variant) {
        this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
    }
}