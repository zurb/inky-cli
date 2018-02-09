#!/usr/bin/env node

var chalk     = require('chalk');
var chokidar  = require('chokidar');
var inky      = require('inky');
var meow      = require('meow');
var multiline = require('multiline');

var cli = multiline(function() {/*
  Usage
    $ inky <input> <output>

  Options
    -w, --watch   Watch input files for changes
*/});

var aliases = {
  w: 'watch'
}

cli = meow(cli);

var src = cli.input.slice(0, -1);
var dest = cli.input[cli.input.length - 1];

if (cli.flags.watch) {
  chokidar.watch(src).on('all', function(evt, file) {
    parse(file);
  });
}
else {
  parse(src);
}

function parse(files) {
  inky({
    src: files,
    dest: dest
  }, function() {
    console.log(chalk.magenta(files), 'processed.');
  });
}
