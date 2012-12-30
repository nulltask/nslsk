
/**
 * Module dependencies.
 */

var crypto = require('crypto')
  , Buffers = require('buffers')
  , message = require('./message')
  , Message = require('./message')
  , utils = require('./utils')
  , Node = require('./node');

/**
 * Soulseek client version.
 */

var version = 182;

/**
 * Soulseek client minior version.
 */

var minor = 1;

/**
 * Expose `Client`.
 */

module.exports = Client;

/**
 * Client constructor.
 *
 * @param {net.Socket|Object} socket
 * @param {Object} options [optional]
 */

function Client(socket, options) {
  Node.apply(this, arguments);
  this.type = 'server';
}

/**
 * Inherits from `Node`.
 */

Client.prototype.__proto__ = Node.prototype;

/**
 * Login.
 *
 * @param {String} username
 * @param {String} password
 * @return {Client}
 */

Client.prototype.login = function(username, password) {
  message(message.SERVER.LOGIN)
    .string(username)
    .string(password)
    .uint32(version)
    .string(utils.md5(username.concat(password)))
    .uint32(minor)
    .end(this.write.bind(this));
  return this;
};

/**
 * File search.
 *
 * @param {String} query
 * @return {Client}
 */

Client.prototype.fileSearch = function(query) {
  crypto.randomBytes(4, function(err, buf) {
    message(26)
      .push(buf)
      .string(query)
      .end(this.write.bind(this));
  }.bind(this));
  return this;
};

/**
 * Search request.
 *
 * @return {Client}
 */

Client.prototype.searchRequest = function() {
  message(message.SERVER.SEARCH_REQUEST).end(this.write.bind(this));
  return this;
};

/**
 * Connect to peer.
 *
 * @param {Number} token
 * @param {String} username
 * @param {String} type
 * @return {Client}
 */

Client.prototype.connectToPeer = function(token, username, type) {
  message(message.SERVER.CONNECT_TO_PEER)
    .uint32(token)
    .string(username)
    .string(type)
    .end(this.write.bind(this));
  return this;
};

/**
 * Get status.
 *
 * @param {String} username
 * @return {Client}
 */

Client.prototype.getStatus = function(username) {
  message(message.SERVER.GET_STATUS)
    .string(username)
    .end(this.write.bind(this));
  return this;
};

/**
 * Privileged users.
 *
 * @return {Client}
 */

Client.prototype.privilegedUsers = function() {
  message(message.SERVER.PRIVILEGED_USERS).end(this.write.bind(this));
  return this;
};

/**
 * Set listen port.
 *
 * @param {Number} port
 * @return {Client}
 */

Client.prototype.setListenPort = function(port) {
  message(message.SERVER.SET_LISTEN_PORT)
    .uint32(port)
    .end(this.write.bind(this));
  return this;
};

/**
 * Get peer address.
 *
 * @param {String} username
 * @return {Client}
 */

Client.prototype.getPeerAddress = function(username) {
  message(message.SERVER.GET_PEER_ADDRESS)
    .string(username)
    .end(this.write.bind(this));
  return this;
};

/**
 * Add user.
 *
 * @param {String} username
 * @return {Client}
 */

Client.prototype.addUser = function(username) {
  message(message.SERVER.ADD_USER)
    .string(username)
    .end(this.write.bind(this));
  return this;
};