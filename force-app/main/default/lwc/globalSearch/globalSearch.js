import { LightningElement, track } from 'lwc';
import searchGlobal from '@salesforce/apex/GlobalSearchController.searchGlobal';

export default class globalSearch extends LightningElement {
    @track searchKey = '';
    @track searchResults = [];

    handleSearch(event) {
        this.searchKey = event.target.value;

        if (this.searchKey.length > 1) {
            searchGlobal({ searchTerm: this.searchKey })
                .then((result) => {
                    this.searchResults = result;
                })
                .catch((error) => {
                    this.searchResults = [];
                    console.error('Error:', error);
                });
        } else {
            this.searchResults = [];
        }
    }
}