import { LightningElement,track, wire } from 'lwc';

import getObjects from '@salesforce/apex/MangoMapController.getObjects';

export default class MangoMapComponent extends LightningElement {
    @track objectOptions = [];

    @wire(getObjects)
    Objects(result) {
        if (result.data) {
            this.objectOptions = [];
            console.log(result.data);
            var i;
            for (i = 0; i < result.data.length; i++) {
                /* Add id and a property which will contain object name. */
                var item = {
                    id: i,
                    objectName: result.data[i],
                };
                this.objectOptions.push(item)
            }
        } else if (result.error) {
            this.error = result.error;
            this.data = undefined;
        }
    }

    @track columns = [{
        label: 'Object Label',
        /* Here we need to pass the item object's property name which contain value of Object Name Which is objectName in this case.  */
        fieldName: 'objectName',
        type: 'text'
    }];
}