
describe('Add contact',function() {
    it('should add a new contact',function(){
    
    	browser.get('http://localhost:8080/api/v2/RestClientGvg');
    	
    	
    	element.all(by.repeater('country in gvg')).then(function(initialCountry){
    		browser.driver.sleep(2000);
    		
    		element(by.model('newCountry.country')).sendKeys('Oceania');
    		element(by.model('newCountry.year')).sendKeys('2017');
    		element(by.model('newCountry.income_million')).sendKeys('15200');
    		element(by.model('newCountry.income_ratio')).sendKeys('7.5');
    		
    		element(by.buttonText('Add')).click().then(function(){
    			element.all(by.repeater('country in gvg')).then(function(gvg){
    				expect(gvg.length).toEqual(gvg.length+1);
    			});
            });
        });
    });
});