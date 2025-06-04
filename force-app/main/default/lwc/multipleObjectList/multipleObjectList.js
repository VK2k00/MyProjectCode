import { LightningElement, wire, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import searchRecords from '@salesforce/apex/AccountController.searchRecords';

export default class MultipleObjectList extends NavigationMixin(LightningElement) {
    @track records;
    @track error;
    @track searchKey = '';
    @track isLoading = false;
    @track pageNumber = 1;
    @track pageSize = 10;
    @track disablePrevious = true;
    @track disableNext = true;

    handleSearchChange(event) {
        this.searchKey = event.target.value;
        this.pageNumber = 1;
        this.searchRecords();
    }

    connectedCallback() {
        this.searchRecords();
    }

    searchRecords() {
        this.isLoading = true;
        searchRecords({ searchKey: this.searchKey, pageNumber: this.pageNumber, pageSize: this.pageSize })
            .then(result => {
                this.records = result;
                this.error = undefined;
                this.isLoading = false;
                this.disablePrevious = this.pageNumber === 1;
                this.disableNext = result.length < this.pageSize;
            })
            .catch(error => {
                this.error = error;
                this.records = undefined;
                this.isLoading = false;
            });
    }

    navigateToRecord(event) {
        const recordId = event.currentTarget.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: 'view'
            }
        });
    }

    previousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber -= 1;
            this.searchRecords();
        }
    }

    nextPage() {
        this.pageNumber += 1;
        this.searchRecords();
    }
}