describe ('Add Data', function(){
    it('Should add a new data',function(){
        browser.get('http://localhost:8080');
        
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