
/**
 * Module dependencies.
 */

var net = require('net')
  , Stream = require('stream')
  , Buffers = require('buffers')
  , Message = require('./message');

/**
 * Expose `Node`.
 */

module.exports = Node;

/**
 * Default Soulseek server.
 */

var host = 'server.slsknet.org';

/**
 * Default Soulseek port.
 */

var port = 2242;

/**
 * Node constructor.
 */

function Node(socket, options) {
  Stream.call(this);
  
  if (null == options) {
    options = socket;
    
    options = options || {};
    options.host = options.host || host;
    options.port = options.port || port;
    
    socket = net.createConnection(options.port, options.host);
  }
  
  this.socket = socket;
  this.bind(this.socket);
}

/**
 * Inherits from `Stream`.
 */

Node.prototype.__proto__ = Stream.prototype;

/**
 * Bind socket with node.
 *
 * @param {net.Socket} socket
 */

Node.prototype.bind = function(socket) {
  var self = this
    , remain = 0
    , buffers = new Buffers();
  
  socket.on('data', function(data) {
    buffers.push(data);
    
    if (buffers.length < 4) return;
    if (remain < 1) remain = buffers.splice(0, 4).toBuffer().readUInt32LE(0);
    if (remain > buffers.length) return;
    
    var message = new Message(buffers.splice(0, remain));
    
    message.decode(self.type, function(err, decoded) {
      // TODO: handle error.
      decoded._message = message;
      self.emit('message', decoded);
      self.emit(message.name, decoded);
    });

    remain = 0;
  });
  
  socket.on('connect', function() {
    self.emit('connect', self);
  });
  
  socket.on('close', function() {
    self.emit.apply(self, ['close'].concat(arguments));
  });
  
  socket.on('timeout', function() {
    self.emit.apply(self, ['timeout'].concat(arguments));
  });
  
  socket.on('error', function() {
    self.emit.apply(self, ['error'].concat(arguments));
  });
};

/**
 * @param {Buffer|Buffers} data
 */

Node.prototype.write = function(data) {
  if (data instanceof Buffers) data = data.toBuffer();
  console.log('send ' + this.type + ' message', data);
  return this.socket.write(data);
};