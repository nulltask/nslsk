
/**
 * Module dependencies.
 */

var crypto = require('crypto')
  , util = require('util')
  , debug = require('debug')('nslsk:manager')
  , EventEmitter = require('events').EventEmitter
  , Message = require('./message')
  , Client = require('./client')
  , Peer = require('./peer')
  , utils = require('./utils');

/**
 * Expose `Manager`.
 */

module.exports = Manager;

/**
 * Manager constructor.
 */

function Manager(port) {
  var self = this;
  
  EventEmitter.call(this);
  
  this.port = port || 2234;
  
  this.client = new Client();
  
  this.peers = {};
  this.tickets = {};
  this.searches = {};
  
  this.client.on('connect', function(client) {
    var num = 0;
    self.peer = require('net').createServer(function(socket) {
      debug('[%s] connection from peer %s:%s', ++num, socket.remoteAddress, socket.remotePort);
      var peer = new Peer(socket);
      peer.on('message', function(message) {
        console.log(message);
      });
      peer.infoRequest();
    });
    self.peer.listen(self.port);
    
    self.emit('connect', client);
  });
  
  this.client.on('message', function(message) {
    console.log(util.inspect(message, false, 4, true));
  });
  
  this.client.on('login', this.onLogin.bind(this));
  this.client.on('connect to peer', this.onConnectToPeer.bind(this));
  this.client.on('privileged users', this.onPriviledgedUsers.bind(this));
  this.client.on('get status', this.onGetStatus.bind(this));
}

/**
 * Inherits from `EventEmitter`.
 */

Manager.prototype.__proto__ = EventEmitter.prototype;

/**
 * @param {Message} message
 */

Manager.prototype.onLogin = function(message) {
  this.client.setListenPort(this.port);
};

/**
 * @param {Message} message
 */

Manager.prototype.onPriviledgedUsers = function(message) {
  var client = this.client;
  message.users.forEach(function(username, index) {
    // client.getStatus(username);
  });
};

/**
 * @param {Message} message
 */

Manager.prototype.onGetStatus = function(message) {
  
};

/**
 * @param {Message} message
 */

Manager.prototype.onConnectToPeer = function(message) {
  var ip = message.ip
    , port = message.port
    , username = message.username
    , token = message.token
    , peer = this.peers[username] = new Peer({ host: ip, port: port });
    
  peer.on('connect', function(peer) {
    debug('connect with %s', username);
    peer.on('message', function(message) {
      debug('peer message from %s: %s', username, util.inspect(message, false, 4, true));
    });    
    peer.pierceFirewall(token);
  });
  
  peer.on('error', function(err) {
    debug('connect error with %s [%s]', username, err.code);
  });
};
