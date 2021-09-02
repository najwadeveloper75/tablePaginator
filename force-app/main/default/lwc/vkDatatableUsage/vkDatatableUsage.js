import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/VKDatatableUsageController.getAccounts';
import getOpportunities from '@salesforce/apex/VKDatatableUsageController.getOpportunities';
import updateRecords from '@salesforce/apex/VKDatatableUsageController.saveRecords';

const STAGEOPTIONS = [
    {value: 'Prospecting', label: 'Prospecting'},
    {value: 'Qualification', label: 'Qualification'},
    {value: 'Needs Analysis', label: 'Needs Analysis'},
    {value: 'Value Proposition', label: 'Value Proposition'},
    {value: 'Id. Decision Makers', label: 'Id. Decision Makers'},
    {value: 'Perception Analysis', label: 'Perception Analysis'},
    {value: 'Proposal/Price Quote', label: 'Proposal/Price Quote'},
    {value: 'Negotiation/Review', label: 'Negotiation/Review'},
    {value: 'Closed Lost', label: 'Closed Lost'},
    {value: 'Closed Won', label: 'Closed Won'}
];
const TYPEOPTIONS = [
    {value: 'Existing Customer - Upgrade', label: 'Existing Customer - Upgrade'},
    {value: 'Existing Customer - Replacement', label: 'Existing Customer - Replacement'},
    {value: 'Existing Customer - Downgrade', label: 'Existing Customer - Downgrade'},
    {value: 'New Customer', label: 'New Customer'}
];

const columns = [
    {label: 'Opportunity Name', fieldName: 'Id', type: 'link', linkLabel: 'Name', 
     sortable: true, sortBy: 'Name', resizable: true, title:'Click to view Opportunity', target:'_blank', editable: true},
    {label: 'Account', fieldName: 'AccountId', type: 'lookup', linkLabel: 'accName', iconName:'standard:account',
     sortable: true, resizable: true, editable: true, required: true, sortBy: 'accName', title:'Click to view Account',},
    {label: 'Type', fieldName: 'Type', type: 'picklist', options: TYPEOPTIONS, sortable: true, resizable: true, required: true, editable: true},
    {label: 'Stage', fieldName: 'StageName', type: 'picklist', options: STAGEOPTIONS, sortable: true, resizable: true, editable: true},
    {label: 'Amount', fieldName: 'Amount', type: 'currency', sortable: true, resizable: true, editable: true},
    {label: 'Close Date', fieldName: 'CloseDate', type: 'date', sortable: true, resizable: true, editable: true},
    {label: 'Probability', fieldName: 'Probability', type: 'percent', sortable: true, resizable: true, editable: true},
    
];
const PAGESIZEOPTIONS = [10,20,40];

export default class VkDatatableUsage extends LightningElement {
    error;
    columns = columns;
    opps; //All opportunities available for data table    
    showTable = false; //Used to render table after we get the data from apex controller    
    pageSizeOptions = PAGESIZEOPTIONS;
    isLoading = true;
    loadMessage = 'Loading...';

    @wire(getAccounts)
    wAccs({error,data}){
        if(data){
            let accounts = [];
            for(let i=0; i<data.length; i++){
                let obj = {value: data[i].Id, label: data[i].Name};
                accounts.push(obj);
            }
            this.columns[1].options = accounts;
        }else{
            this.error = error;
        }       
    }

    connectedCallback(){
        this.getOpportunities_();
    }

    getOpportunities_(){
        this.showTable = false;
        this.loadMessage = 'Loading...';
        this.isLoading = true;
        this.error = '';
        getOpportunities()
        .then(data=>{
            this.opps = [];
            for(let i=0; i<data.length; i++){
                let obj = {...data[i]};
                obj.accName = data[i].Account.Name;
                this.opps.push(obj);
            }
            this.showTable = true;
            this.isLoading = false;
        })
        .catch(error=>{
            this.error = JSON.stringify(error);
            this.showTable = true;
            this.isLoading = false;
        });       
    }

    handleRowSelection(event){
        console.log('Records selected***'+JSON.stringify(event.detail));
    }

    saveRecords(event){
        this.loadMessage = 'Saving...';
        this.isLoading = true;
        this.error = '';
        updateRecords({recsString: JSON.stringify(event.detail)})
        .then(response=>{
            if(response==='success') this.getOpportunities_();
        })
        .catch(error=>{
            console.log('recs save error***'+error);
            this.error = JSON.stringify(error);
            this.isLoading = false;
        });
    }
}