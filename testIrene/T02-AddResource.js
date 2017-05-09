describe ('Add Data', function(){
    it('Should add a new data',function(){
        browser.get('https://sos1617-01-ipf-sandbox-sos161701ipf.c9users.io/api/v2/startups-stats?apikey=sos161701');
        
        element.all(by.repeater('data in datas')).then(function(initialData){
            browser.driver.sleep(2000);
            
            element(by.model('newData.country')).sendKeys('Jordania');
            element(by.model('newData.year')).sendKeys('Jordania');
            element(by.model('newData.total')).sendKeys('Jordania');
            element(by.model('newData.increase')).sendKeys('Jordania');
            element(by.model('newData.investment')).sendKeys('Jordania');
            
            element(by.buttonText('Add')).click().then(function(){
                element.all(by.repeater('data in datas')).then(function(datas){
                    expect(datas.length).toEqual(initialData.length+1);
                })
            })
        })
    })
})