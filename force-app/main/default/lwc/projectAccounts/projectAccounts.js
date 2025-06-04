import { LightningElement, track, wire, api } from 'lwc';
import getAcclist from '@salesforce/apex/accountRecords.getAcclist';
import getSortedList from '@salesforce/apex/accountRecords.getSortedList';
import getdetaillist from '@salesforce/apex/accountRecords.getdetaillist';
import getContactlist from '@salesforce/apex/accountRecords.getContactlist';
import getContacts from '@salesforce/apex/accountRecords.getContacts';
import updateAccount from '@salesforce/apex/accountRecords.updateAccount';
import updateContact from '@salesforce/apex/accountRecords.updateContact';
import deleteContact from '@salesforce/apex/accountRecords.deleteContact';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
const columns = [
  { label: 'Account Name', fieldName: 'Name' },
  {
    type: "button",
    label: "View Details",
    fixedWidth: 270,
    typeAttributes: {
      label: 'View',
      title: 'View Details',
      name: 'viewDetails',
      value: 'viewDetails',
      variant: 'brand',
    }
  },
];
const columns1 = [
  { label: 'Contact Name', fieldName: 'Name' },
  {
    type: "button",
    label: "Edit",
    fixedWidth: 100,
    typeAttributes: {
      label: 'Edit',
      title: 'Edit Details',
      name: 'editRecord',
      value: 'editRecord',
      variant: 'brand',
    }
  },
  {
    type: "button",
    label: "Delete",
    fixedWidth: 100,
    typeAttributes: {
      label: 'Delete',
      title: 'Delete Details',
      name: 'deleteRecord',
      value: 'deleteRecord',
      variant: 'destructive',
    }
  },
];
const sortOptions = [
  { value: 'Asc', label: 'Asc' },
  { value: 'Desc', label: 'Desc' }
];
export default class projectAccounts extends LightningElement {
  columns = columns;   // column information datatable
  columns1 = columns1;
  sortOptions = sortOptions;  //srot options available
  pageSizeOptions = [5, 10, 20]; // page size options
  totalRecords = 0; // Total numbers of records
  records = [];  // all records available in datatable
  pageNumber = 1; // Page Number
  totalPages; // number of pages
  pageSize; // number of records per page
  recordsToDisplay = [];
  recordsCon = [];
  @track error;
  @api recordId;   //It store current page record
  @api searchKey = '';
  @api lwcRecordId;
  @api recId;
  @api accId;
  @api conId;
  @api lwcId;
  @api coId;
  accountDetails;
  conDetails;
  showDetails;
  @api accountName;
  @api accountType;
  @api accountNumber;
  @api accountCount;
  @api conFName;
  @api conLName;
  @api conEmail;
  @api conPhone;
  @track isModal = false;
  resultAccount
  resultContact

  //  Get Account Details 
  @wire(getdetaillist, { recordId: '$lwcRecordId' })
  retriveData(result) {
    this.resultAccount = result;
    if (result.data) {
      this.accountDetails = result.data;
    }
  };
  // Get Related Contact from Account
  @wire(getContactlist, { recId: '$lwcRecordId' })
  getData(result) {
    this.resultContact = result;
    if (result.data) {
      // this.conDetails = data;  
      this.recordsCon = result.data;
    }
  };
  @wire(getContacts, { conId: '$lwcId' })
  getConData({ data, error }) {
    console.log(this.search)
    if (data) {
      this.conDetails = data;
      // this.recordsCon = data;
      console.log(data);
    } else if (error) {
      console.log(error);
    }
  };
  // Modal PopUp Configuration
  @track isModalOpen = false;
  showModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  // Pagination is Started from here in Javascript file *********
  get bDisableFirst() {
    return this.pageNumber == 1;
  }
  get bDisableLast() {
    return this.pageNumber == this.totalPages;
  }
  // get records from apex
  connectedCallback() {
    getAcclist({ lwcRecordId: this.recordId })
      .then((result) => {
        if (result != null) {
          console.log('Result==>' + JSON.stringify(result));
          this.records = result; // get data into array
          this.totalRecords = result.length; // update total record count
          this.pageSize = this.pageSizeOptions[0]; // set the default record to show is first option
          this.paginationHelper(); // call helper method to update pagination logic
        }
      })
      .catch(error => {
        console.log('Error Occured' + JSON.stringify(error));
      })
  }
  handleRecordsPerPage(event) {
    this.pageSize = event.target.value;
    this.paginationHelper();
  }
  previousPage() {
    this.pageNumber = this.pageNumber - 1;
    this.paginationHelper();
  }
  nextPage() {
    this.pageNumber = this.pageNumber + 1;
    this.paginationHelper();
  }
  firstPage() {
    this.pageNumber = 1;
    this.paginationHelper();
  }
  lastPage() {
    this.pageNumber = this.totalPages;
    this.paginationHelper();
  }
  paginationHelper() {
    this.recordsToDisplay = [];
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    if (this.pageNumber <= 1) {
      this.pageNumber = 1;
    }
    else if (this.pageNumber >= this.totalPages) {
      this.pageNumber = this.totalPages;
    }
    for (let i = (this.pageNumber - 1) * this.pageSize; i < this.pageNumber * this.pageSize; i++) {
      if (i === this.totalRecords) {
        break;
      }
      this.recordsToDisplay.push(this.records[i]);
    }
  }
  // search key functionality // ************
  handleKeywordChange(event) {
    this.pageNumber = 1;
    this.searchKey = event.target.value;
    console.log('searchKey' + JSON.stringify(this.searchKey));
    // send recordId and searchkey to apex method 
    getAcclist({ searchKeys: this.searchKey, lwcRecordId: this.recordId })
      .then((res) => {
        this.recordsToDisplay = res;
      })
      .then(error => {
        console.log(error);
      })
    this.paginationHelper();
  }
  // sort functionality // ****************
  handleChange(event) {
    this.value = event.target.value;
    getSortedList({ Value: this.value })
      .then((result) => {
        this.recordsToDisplay = result;
      })
      .catch(error => {
        console.log(error);
      })
  }
  // View Account details after onClick on view button //**************
  getSelectedRow(event) {
    // alert('error occured');
    const actionName = event.detail.action.name;
    const row = event.detail.row;
    const Id = row.Id;
    if (actionName == 'viewDetails') {
      this.showDetails = true;
      this.lwcRecordId = Id;
    }
    console.log(actionName);
    console.log(row);
  }
  // Open modal popup for contact details editing ************************
  getContacts(event) {
    // console.log('fwefwefewf');
    const actionName1 = event.detail.action.name;
    const row1 = event.detail.row;
    const Id1 = row1.Id;
    if (actionName1 == 'editRecord') {
      this.isModal = true;
      this.lwcId = Id1;
    }
    else if (actionName1 == 'deleteRecord') {
      this.lwcId = Id1;
      console.log
      deleteContact({ coId: this.lwcId })
        .then(result => {
          console.log('prashant ' + result);
          const evt = new ShowToastEvent({
            title: "Deleted",
            message: 'Record Deleted Successfully',
            variant: "success",
          });
          this.dispatchEvent(evt);
          refreshApex(this.resultContact)
          // alert('Acoount Updated Successfully');
          // this.dispatchEvent(Evt);        
        })
        .catch(error => {
          console.log(error);
        })
    }
    console.log(actionName1);
    console.log(row1);
  }
  closeBox() {
    this.isModal = false;
  }
  // Modal For Account Details Edit Section ***************
  submitDetails() {
    var inp = this.template.querySelectorAll("lightning-input");
    inp.forEach(function (element) {
      if (element.name == "name")
        this.accountName = element.value;
      else if (element.name == "count")
        this.accountCount = element.value;
      else if (element.name == "type")
        this.accountType = element.value;
      else if (element.name == "number")
        this.accountNumber = element.value;
    }, this);
    updateAccount({ accId: this.lwcRecordId, accountNames: this.accountName, accountCounts: this.accountCount, accountTypes: this.accountType, accountNumbers: this.accountNumber })
      .then(result => {
        refreshApex(this.resultAccount);

        const evt = new ShowToastEvent({
          title: "Success",
          message: 'Record Updated Successfully',
          variant: "success",
        });
        this.dispatchEvent(evt);
        // alert('Acoount Updated Successfully');
        // this.dispatchEvent(Evt);
        this.isModalOpen = false

      })
      .catch(error => {
        console.log(error);
      })
  }
  submitContact() {
    var inp1 = this.template.querySelectorAll("lightning-input");
    inp1.forEach(function (element) {
      if (element.name == "fname")
        this.conFName = element.value;
      if (element.name == "lname")
        this.conLName = element.value;
      else if (element.name == "email")
        this.conEmail = element.value;
      else if (element.name == "phone")
        this.conPhone = element.value;
    }, this);
    updateContact({ coId: this.lwcId, conFNames: this.conFName, conLNames: this.conLName, conEmails: this.conEmail, conPhones: this.conPhone })
      .then(result => {
        if (result) {
          const evt = new ShowToastEvent({
            title: "Success",
            message: 'Record Updated Successfully',
            variant: "success",
          });
          this.dispatchEvent(evt);
          // alert('Acoount Updated Successfully');
          // this.dispatchEvent(Evt);
          refreshApex(this.resultContact)
          this.isModal = false

        }
        else {
          alert('Data not updated');
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
}