
/**
 * Module dependencies.
 */

var crypto = require('crypto')
  , Buffers = require('buffers')
  , message = require('./message')
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

/**
 * Say in chat room.
 *
 * @param {String} room
 * @param {String} message
 * @return {Client}
 */

Client.prototype.sayInChatRoom = function(room, message) {
  message(message.SERVER.SAY_IN_CHAT_ROOM)
    .string(room)
    .string(message)
    .end(this.write.bind(this));
  return this;
};

/**
 * Join a room.
 *
 * @param {String} room
 * @return {Client}
 */

Client.prototype.joinRoom = function(room) {
  message(message.SERVER.JOIN_ROOM)
    .string(room)
    .end(this.write.bind(this));
  return this;
};

/**
 * Leave room.
 *
 * @param {String} room
 * @return {Client}
 */

Client.prototype.leaveRoom = function(room) {
  message(message.SERVER.LEAVE_ROOM)
    .string(room)
    .end(this.write.bind(this));
  return this;
};

/**
 * Room list.
 *
 * @return {Client}
 */

Client.prototype.roomList = function() {
  message(message.SERVER.ROOM_LIST).end(this.write.bind(this));
  return this;
};

/**
 * Set room ticker.
 *
 * @param {String} room
 * @param {String} ticker
 * @return {Client}
 */

Client.prototype.setRoomTicker = function(room, ticker) {
  message(message.SERVER.SET_ROOM_TICKER)
    .string(room)
    .string(ticker)
    .end(this.write.bind(this));
  return this;
};

/**
 * Get user stats.
 *
 * @param {String} username
 * @return {Client}
 */

Client.prototype.getUserStats = function(username) {
  message(message.SERVER.GET_USER_STATS)
    .string(username)
    .end(this.write.bind(this));
  return this;
};

/**
 * Acknowledge private messsage.
 *
 * @param {Number} messageID
 * @return {Client}
 */

Client.prototype.acknowledgePrivateMessage = function(messageID) {
  message(message.SERVER.ACKNOWLEDGE_PRIVATE_MESSAGE)
    .int32(messageID)
    .end(this.write.bind(this));
  return this;
};

/**
 * Set online status.
 *
 * @param {Number} status
 * @return {Client}
 */

Client.prototype.setOnlineStatus = function(status) {
  message(message.SERVER.SET_ONLINE_STATUS)
    .int32(status)
    .end(this.write.bind(this));
  return this;
};

/**
 * Ping.
 *
 * @return {Client}
 */

Client.prototype.ping = function() {
  message(message.SERVER.PING).end(this.write.bind(this));
  return this;
};

/**
 * Send speed.
 *
 * @param {String} username
 * @param {Number} speed
 * @return {Client}
 */

Client.prototype.sendSpeed = function(username, speed) {
  message(message.SERVER.SEND_SPEED)
    .string(username)
    .int32(speed)
    .end(this.write.bind(this));
  return this;
};

/**
 * Shared folders & files.
 *
 * @param {Number} dirs
 * @param {Number} files
 * @return {Client}
 */

Client.prototype.sharedFoldersAndFiles = function(dirs, files) {
  message(message.SERVER.SHARED_FOLDERS_AND_FILES)
    .int32(dirs)
    .int32(files)
    .end(this.write.bind(this));
  return this;
};

/**
 * Check privileges.
 *
 * @return {Client}
 */

Client.prototype.checkPrivileges = function() {
  message(message.SERVER.CHECK_PRIVILEGES).end(this.write.bind(this));
  return this;
};