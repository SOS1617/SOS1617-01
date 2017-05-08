describe ('Add Data', function(){
    it('Should add a new data',function(){
        browser.get('http://localhost:8080');
        
        element.all(by.repeater('country in gvg')).then(function(initialData){
            browser.driver.sleep(2000);
            
            element(by.model('newCountry.country')).sendKeys('Rusia');
            element(by.model('newCountry.year')).sendKeys('Rusia');
            element(by.model('newCountry.income_million')).sendKeys('Rusia');
            element(by.model('newCountry.income_ratio')).sendKeys('Rusia');
        
            
            element(by.buttonText('Add')).click().then(function(){
                element.all(by.repeater('country in gvg')).then(function(gvg){
                    expect(gvg.length).toEqual(initialData.length+1);
                })
            })
        })
    })
})