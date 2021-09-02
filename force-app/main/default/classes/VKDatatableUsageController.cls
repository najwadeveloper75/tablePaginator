public with sharing class VKDatatableUsageController {    
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts() {
        return [SELECT Id, Name FROM Account];
    }

    @AuraEnabled
    public static List<SObject> getOpportunities() {
        return [SELECT Id, Name, Type, StageName, Amount, CloseDate, Probability, AccountId, Account.Name FROM Opportunity];
    }

    @AuraEnabled
    public static String saveRecords(String recsString) {
        List<Opportunity> recs2Save = (List<Opportunity>) JSON.deserialize(recsString, List<Opportunity>.class);
        update recs2Save;
        return 'success';
    }
}