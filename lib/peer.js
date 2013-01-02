
/**
 * Module dependencies.
 */

var Node = require('./node')
  , message = require('./message');

/**
 * Expose `Peer`.
 */

module.exports = Peer;

/**
 * Peer constructor.
 */

function Peer(socket, options) {
  Node.apply(this, arguments);
  this.type = 'peer';
}

/**
 * Inherits from `Node`.
 */

Peer.prototype.__proto__ = Node.prototype;

/**
 * Pierce firewall
 *
 * @param {Number} token
 * @return {Peer}
 */

Peer.prototype.pierceFirewall = function(token) {
  message()
    .uchar(message.PEER.PIERCE_FIREWALL)
    .uint32(token)
    .end(this.write.bind(this));
  return this;
};

/**
 * Peer init.
 *
 * @param {String} localUsername
 * @param {String} type
 * @param {Number} token
 * @return {Peer}
 */

Peer.prototype.peerInit = function(localUsername, type, token) {
  message()
    .uchar(message.PEER.PEER_INIT)
    .string(localUsername)
    .string(type)
    .uint32(token)
    .end(this.write.bind(this));
  return this;
};

/**
 * Shares request.
 *
 * @return {Peer}
 */

Peer.prototype.sharesRequest = function() {
  message(message.PEER.SHARES_REQUEST).end(this.write.bind(this));
  return this;
};

/**
 * Info request.
 *
 * @return {Peer}
 */

Peer.prototype.infoRequest = function() {
  message()
    .uchar(message.PEER.INFO_REQUEST)
    .end(this.write.bind(this));
  return this;
};