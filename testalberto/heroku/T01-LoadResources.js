

describe('Data is loaded',function(){
    it('It should show a bunch of datas', function(){
        browser.get('https://sos1617-01-arg-sandbox-sos161701arg.c9users.io/#!/yuscountries');
        
        element(by.model('apikey')).sendKeys('sos161701');
            element(by.buttonText('Apikey')).click().then(function(){
                            browser.driver.sleep(2000);
        
        var datas = element.all(by.repeater('country in countries')).then(function(c){
        expect(c.length).toBeGreaterThan(2);
                });
     
    });
        }); 

})