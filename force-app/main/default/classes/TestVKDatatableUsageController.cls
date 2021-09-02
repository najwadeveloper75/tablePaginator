@isTest
private class TestVKDatatableUsageController{
  @testSetup
  static void setupTestData(){
    test.startTest();
    Account account_Obj = new Account(Name = 'Name703');
    Insert account_Obj; 
    Opportunity opportunity_Obj = new Opportunity(AccountId = account_Obj.id, Name = 'Name263', StageName = 'Qualification', Amount = 9, Probability = 10, CloseDate = Date.today());
    Insert opportunity_Obj; 
    test.stopTest();
  }
  static testMethod void test_getAccounts_UseCase1(){
    List<Account> account_Obj  =  [SELECT Id,Name from Account];
    System.assertEquals(true,account_Obj.size()>0);
    List<Opportunity> opportunity_Obj  =  [SELECT Id,AccountId,Name,StageName,Amount,Probability,CloseDate from Opportunity];
    System.assertEquals(true,opportunity_Obj.size()>0);
    VKDatatableUsageController obj01 = new VKDatatableUsageController();
    VKDatatableUsageController.getAccounts();
  }
  static testMethod void test_getOpportunities_UseCase1(){
    List<Account> account_Obj  =  [SELECT Id,Name from Account];
    System.assertEquals(true,account_Obj.size()>0);
    List<Opportunity> opportunity_Obj  =  [SELECT Id,AccountId,Name,StageName,Amount,Probability,CloseDate from Opportunity];
    System.assertEquals(true,opportunity_Obj.size()>0);
    VKDatatableUsageController obj01 = new VKDatatableUsageController();
    VKDatatableUsageController.getOpportunities();
  }
  static testMethod void test_saveRecords_UseCase1(){
    List<Account> account_Obj  =  [SELECT Id,Name from Account];
    System.assertEquals(true,account_Obj.size()>0);
    List<Opportunity> opportunity_Obj  =  [SELECT Id,AccountId,Name,StageName,Amount,Probability,CloseDate from Opportunity];
    System.assertEquals(true,opportunity_Obj.size()>0);
    VKDatatableUsageController obj01 = new VKDatatableUsageController();
    //VKDatatableUsageController.saveRecords('Name263', 'Qualification', 9, 10, Date.today());
      String value = '(Opportunity:{"Type"="New Customer", "AccountId"="0015g00000OcN9gAAF", "StageName"="Negotiation/Review", "Amount"="75000.0", "Probability"="100.0", "Id=0065g00000C4ecrAAB", "CloseDate"="2021-08-14 00:00:00", "Name"="Edge Emergency Generator"})';
      VKDatatableUsageController.saveRecords(JSON.serialize(opportunity_Obj));
    //update opportunity_Obj;
  }
}