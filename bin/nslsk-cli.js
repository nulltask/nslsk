#!/usr/bin/env node

/**
 * Module dependencies.
 */

var program = require('commander');
var repl = require('repl');
var Manager = require('../lib/manager');

program
  .option('-u --username [username]', 'username')
  .option('-p --password [password]', 'password')
  .parse(process.argv);

/**
 * Create the soulseek client manager.
 */

var slsk = new Manager();

slsk.on('connect', function() {
  slsk.client.login(program.username, program.password);
  
  slsk.client.on('login', function() {
    var r = repl.start({
      prompt: 'nslsk> ',
      input: process.stdin,
      output: process.stdout
    });
    r.context.slsk = slsk;
  });
});
