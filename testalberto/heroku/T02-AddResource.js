describe ('Add Data', function(){
    it('Should add a new data',function(){
        browser.get('https://sos1617-01-arg-sandbox-sos161701arg.c9users.io/#!/yuscountries');
        
        
        element(by.model('apikey')).sendKeys('sos161701');
            element(by.buttonText('Apikey')).click().then(function(){
                            browser.driver.sleep(2000);

        element.all(by.repeater('country in countries')).then(function(initialData){
            browser.driver.sleep(2000);
            
            
             

            
            element(by.model('newCountry.country')).sendKeys('japan');
            element(by.model('newCountry.year')).sendKeys('2017');
            element(by.model('newCountry.male_unemployment_ratio')).sendKeys('6');
            element(by.model('newCountry.female_unemployment_ratio')).sendKeys('6');
        
            
            element(by.buttonText('Add')).click().then(function(){
                element.all(by.repeater('country in countries')).then(function(c){
                    expect(c.length).toEqual(initialData.length+1);
                });
            });
        });
            });
    });
})