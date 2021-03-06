describe ('Add Data', function(){
    it('Should add a new data',function(){
        browser.get('https://sos1617-01.herokuapp.com/#!/gvg');
        
        
       
        element(by.model('apikey')).sendKeys('sos161701');
            element(by.buttonText('Apikey')).click().then(function(){
                            browser.driver.sleep(2000);

        element.all(by.repeater('country in gvg')).then(function(initialData){
            browser.driver.sleep(2000);
            
            element(by.model('newCountry.country')).sendKeys('japan');
            element(by.model('newCountry.year')).sendKeys('2017');
            element(by.model('newCountry.income_million')).sendKeys('6000');
            element(by.model('newCountry.income_ratio')).sendKeys('6.3');
        
    
          element(by.buttonText('Add')).click().then(function(){
                browser.driver.sleep(2000);
                element.all(by.repeater('country in gvg')).then(function(c){
                    expect(c.length).toEqual(initialData.length+1);
                });
            });
        });
            });
    });
})