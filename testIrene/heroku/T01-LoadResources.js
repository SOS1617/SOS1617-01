var fs = require('fs');

function writeScreenShot(data,filename){
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data,'base64'));
    stream.end();
}

describe('Data is loaded',function(){
    it('It should show a bunch of datas', function(){
        browser.get('https://sos1617-01-ipf-sandbox-sos161701ipf.c9users.io/#!/ss');
        var datas = element.all(by.repeater('data in datas'));
        expect(datas.count()).toBeGreaterThan(3);
    });
})
