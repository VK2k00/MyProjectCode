import { LightningElement, track } from 'lwc';

export default class MultiStepForm extends LightningElement {
    @track currentStep = 1;
    @track formData = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    };
    @track isSubmitted = false;

    get isStep1() {
        return this.currentStep === 1;
    }

    get isStep2() {
        return this.currentStep === 2;
    }

    handleChange(event) {
        const field = event.target.dataset.field;
        this.formData[field] = event.target.value;
    }

    handleNext() {
        this.currentStep++;
    }

    handlePrevious() {
        this.currentStep--;
    }

    handleSubmit() {
        // Normally, you might call an Apex method to save data
        console.log('Form Data:', JSON.stringify(this.formData));
        this.isSubmitted = true;
    }
}