var exec = require('child_process').exec;
var expect = require('chai').expect;
var fs = require('fs');
var rimraf = require('rimraf');

describe('Inky CLI', function() {
  it('converts Inky files to HTML', function(done) {
    this.timeout(10000);

    exec('./index.js test/fixtures/test.html test/fixtures/_build', function(err) {
      fs.readFile('test/fixtures/_build/test.html', function(err, data) {
        html = data.toString();

        expect(err).to.be.null;
        expect(html).to.contain('"row"');
        expect(html).to.not.contain('<row>');
        done();
      });
    });
  });

  after(function(done) {
    rimraf('test/fixtures/_build', done);
  });
});
