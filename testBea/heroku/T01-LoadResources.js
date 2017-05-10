var fs = require('fs');

function writeScreenShot(data,filename){
    var stream = fs.createWriteStream(filename);
    stream.write(new Buffer(data,'base64'));
    stream.end();
}

describe('Data is loaded',function(){
    it('It should show a bunch of datas', function(){
        browser.get('https://sos1617-01.herokuapp.com/#!/gvg');
        var datas = element.all(by.repeater('country in gvg'));
      
        expect(datas.count()).toBeGreaterThan(2);
    });
})