var fs = require('fs');

function writeScreenShot(data,filename){
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data,'base64'));
    stream.end();
}

describe('Data is loaded',function(){
    if('It should show a bunch of datas', function(){
        browser.get('http://localhost:8080');
        var datas = element.all(by.repeater('country in gvg'));
        browser.takeScreenShot().then(function(png){
            writeScreenShot(png,'ng-test.png');
        });
        expect(datas.count()).toBeGreaterThan(3);
    });
})