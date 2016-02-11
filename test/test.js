var exec = require('child_process').exec;
var expect = require('chai').expect;
var fs = require('fs');
var rimraf = require('rimraf');

describe('Inky CLI', () => {
  it('converts Inky files to HTML', done => {
    exec('./index.js test/fixtures/test.html test/fixtures/_build', err => {
      fs.readFile('test/fixtures/_build/test.html', (err, data) => {
        html = data.toString();

        expect(err).to.be.null;
        expect(html).to.contain('"row"');
        expect(html).to.not.contain('<row>');
        done();
      });
    });
  });

  after(done => {
    rimraf('test/fixtures/_build', done);
  });
});
