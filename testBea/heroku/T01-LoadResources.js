var fs = require('fs');

function writeScreenShot(data, filename) {
        var stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
        stream.end();
}

describe('Data is loaded', function () {
	it('should show a bunch of data', function (){
		browser.get('https://sos1617-01-brr-sos161701brr.c9users.io/api/v2/RestClientGvg');
		var contacts = element.all(by.repeater('country in gvg'));
		browser.takeScreenshot().then(function (png) {
    			writeScreenShot(png, 'ng-test.png');
    		});
		expect(contacts.count()).toBeGreaterThan(3);
	});
});