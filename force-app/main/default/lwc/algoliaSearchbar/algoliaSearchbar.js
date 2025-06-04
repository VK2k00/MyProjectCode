import { LightningElement, track } from 'lwc';

const PAGE_SIZE = 10; // Number of products per page

export default class OFI_Page extends LightningElement {


    @track searchTerm = '';
    @track categoryResults = null;
    @track pageResults = null;
    @track productResults = null;
    @track ofiResults = null;
    @track error = null;
    showResults = false;
    @track message = 'To initiate search, please enter topic/item of interest';
    currentPage = 1;
    displayedProducts = [];
    totalPages = 0;
    isLoading = false; // spinner
    get showNoResultsMessage() {
        if (!this.showResults && this.isLoading) {
            this.message = 'No results found! Change a few things up and try searching again.';

        }

        return !this.isLoading && !this.showResults;

    }
    async performSearch() {
        this.isLoading = true; // Set isLoading to true when starting the search
        try {
            if (this.searchTerm != '') {
                const responseCategories = await fetch('https://0X3GA8LNLH-dsn.algolia.net/1/indexes/magento2_default_categories/query', {
                    method: 'POST',
                    headers: {
                        'X-Algolia-Application-Id': '0X3GA8LNLH',
                        'X-Algolia-API-Key': '0552fba9d8dd9ec3e324ebf034d598e6',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({

                        params: `query=${this.searchTerm}`
                    })
                });

                const responsePages = await fetch('https://0X3GA8LNLH-dsn.algolia.net/1/indexes/magento2_default_pages/query', {
                    method: 'POST',
                    headers: {
                        'X-Algolia-Application-Id': '0X3GA8LNLH',
                        'X-Algolia-API-Key': '0552fba9d8dd9ec3e324ebf034d598e6',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        params: `query=${this.searchTerm}`
                    })
                });

                const responseProducts = await fetch('https://0X3GA8LNLH-dsn.algolia.net/1/indexes/magento2_default_products/query', {
                    method: 'POST',
                    headers: {
                        'X-Algolia-Application-Id': '0X3GA8LNLH',
                        'X-Algolia-API-Key': '0552fba9d8dd9ec3e324ebf034d598e6',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        params: `query=${this.searchTerm}`
                    })
                });

                const responseOfi = await fetch('https://0X3GA8LNLH-dsn.algolia.net/1/indexes/ofi-content/query', {
                    method: 'POST',
                    headers: {
                        'X-Algolia-Application-Id': '0X3GA8LNLH',
                        'X-Algolia-API-Key': '0552fba9d8dd9ec3e324ebf034d598e6',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        params: `query=${this.searchTerm}`
                    })
                });
                const responseContracts = await fetch('https://0X3GA8LNLH-dsn.algolia.net/1/indexes/ofi-sf-contracts/query', {
                    method: 'POST',
                    headers: {
                        'X-Algolia-Application-Id': '0X3GA8LNLH',
                        'X-Algolia-API-Key': '0552fba9d8dd9ec3e324ebf034d598e6',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        params: `query=${this.searchTerm}`
                    })
                });

                if (!responseContracts.ok) {
                    throw new Error('Network response was not ok.');
                }
                const dataContracts = await responseContracts.json();
                console.log('API Response Categories:', dataContracts);
                if (dataContracts.hits && dataContracts.hits.length > 0) {
                    this.contractResults = dataContracts.hits.map(hit => ({
                        recordLabel: hit.recordLabel,
                        url: hit.url
                    }));
                } else {
                    this.contractResults = [];
                }

                if (!responseCategories.ok) {
                    throw new Error('Network response was not ok.');
                }
                const dataCategories = await responseCategories.json();
                console.log('API Response Categories:', dataCategories);
                if (dataCategories.hits && dataCategories.hits.length > 0) {
                    this.categoryResults = dataCategories.hits.map(hit => ({
                        name: hit.name,
                        url: hit.url
                    }));
                } else {
                    this.categoryResults = [];
                }

                if (!responsePages.ok) {
                    throw new Error('Network response was not ok.');
                }
                const dataPages = await responsePages.json();
                console.log('API Response Pages:', dataPages);
                if (dataPages.hits && dataPages.hits.length > 0) {
                    this.pageResults = dataPages.hits.map(hit => ({
                        name: hit.name,
                        url: hit.url
                    }));
                } else {
                    this.pageResults = [];
                }

                if (!responseProducts.ok) {
                    throw new Error('Network response was not ok.');
                }
                const dataProducts = await responseProducts.json();
                console.log('API Response Products:', dataProducts);
                if (dataProducts.hits && dataProducts.hits.length > 0) {
                    this.productResults = dataProducts.hits.map(hit => ({
                        id: hit.objectID,
                        name: hit.name,
                        categories_without_path: hit.categories_without_path.join(', '),
                        url: hit.url,
                        image_url: hit.image_url,
                        price: hit.price.USD.default_formated
                    }));
                } else {
                    this.productResults = [];
                }

                if (!responseOfi.ok) {
                    throw new Error('Network response was not ok.');
                }
                const dataOfi = await responseOfi.json();
                console.log('API Response ofi-content:', dataOfi);
                if (dataOfi.hits && dataOfi.hits.length > 0) {
                    this.ofiResults = dataOfi.hits.map(hit => ({
                        name: hit['name-en-US'] || hit['name-de-DE'],
                        description: hit.fields.pagDescription ? hit.fields.pagDescription['en-US'] || hit.fields.pagDescription['de-DE'] : '',
                        url: hit.baseurl ? `${hit.baseurl}/${hit.path}` : '#'
                    }));
                } else {
                    this.ofiResults = [];
                }

                this.showResults = this.categoryResults.length > 0 || this.pageResults.length > 0 || this.productResults.length > 0 || this.ofiResults.length > 0;
                this.totalPages = Math.ceil(this.productResults.length / PAGE_SIZE);
                this.displayedProducts = this.productResults.slice(0, PAGE_SIZE);

            }
        } catch (error) {
            console.error('Error:', error);

        }
        finally {
            this.isLoading = false; // Set isLoading to false after search completes
        }
    }
    debounce(func, delay) {
        return (...args) => {
            clearTimeout(this.debounceTimeout);
            this.debounceTimeout = setTimeout(() => func.apply(this, args), delay);
        };
    }
    handleSearch(event) {
        this.searchTerm = event.target.value;
        console.log('input value= ', this.searchTerm);
        if (this.searchTerm != '') {

            this.debounce(() => this.performSearch(), 1000)();

        }
        else {
            this.showResults = false;
            this.message = 'To initiate search, please enter topic/item of interest';
        }
        // this.performSearch();
    }

    handleSearchIconClick() {
        const inputField = this.template.querySelector('input');
        if (inputField) {
            inputField.focus();
        }
    }

    handleClear() {
        this.searchTerm = '';
        this.categoryResults = null;
        this.pageResults = null;
        this.productResults = null;
        this.ofiResults = null;
        this.showResults = false;
        this.error = null;
        this.currentPage = 1;
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            const start = (this.currentPage - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            this.displayedProducts = this.productResults.slice(start, end);
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            const start = (this.currentPage - 1) * PAGE_SIZE;
            const end = start + PAGE_SIZE;
            this.displayedProducts = this.productResults.slice(start, end);
        }
    }
}