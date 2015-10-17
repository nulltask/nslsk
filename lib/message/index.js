
/**
 * Module dependencies.
 */

var debug = require('debug')('nslsk:message')
  , zlib = require('zlib')
  , Buffers = require('buffers')
  , bigint = require('bignum'); 

/**
 * Expose `Message`.
 */

module.exports = Message;

/**
 * Server message.
 */

Message.SERVER = require('./server');

/**
 * Peer message.
 */

Message.PEER = require('./peer');

/**
 * Distributed message.
 */

Message.DISTRIBUTED = require('./distributed');

/**
 * Message constructor.
 *
 * @param {Buffers|Number} [optional]
 */

function Message(buffers) {
  if (!(this instanceof Message)) {
    return new Message(buffers);
  }

  this.name = 'unknown';
  this._cursor = 0;

  if (buffers instanceof Buffers) {
    this._buffers = buffers;
  } else {
    this._buffers = new Buffers();
  }

  if ('[object Number]' === Object.prototype.toString.call(buffers)) {
    this.uint32(buffers);  // code
  }
}

/**
 * @param {Number} val [optional]
 * @return {Message|Number}
 */

Message.prototype.uint32 = function(val) {
  if (val) {
    var buf = new Buffer(4);

    buf.writeUInt32LE(val, 0);
    this._buffers.push(buf);

    return this;
  }
  var ret = this._buffers.slice(this._cursor, this._cursor + 4).readUInt32LE(0);
  this._cursor += 4;
  return ret;
};

/**
 * @param {Number} val [optional]
 * @return {Message|Number}
 */

Message.prototype.uchar = function(val) {
  if (val || 0 === val) {
    this._buffers.push(new Buffer([val]));
    return this;
  }
  var ret = this._buffers.get(this._cursor);
  ++this._cursor;
  return ret;
};

/**
 * @param {String} val [optional]
 * @return {Message|String}
 */

Message.prototype.string = function(val) {
  if (val) {
    var buf = new Buffer(val, 'utf8');

    this.uint32(buf.length);
    this._buffers.push(buf);

    return this;
  }
  var len = this.uint32();
  var ret = this._buffers.slice(this._cursor, this._cursor + len).toString('utf8');
  this._cursor += len;
  return ret;
};

/**
 * @param {Number} val [optional]
 * @return {Message|Number}
 */

Message.prototype.int32 = function(val) {
  if (val) {
    var buf = new Buffer(4);

    buf.writeInt32LE(val, 0);
    this._buffers.push(buf);

    return this;
  }
  var ret = this._buffers.slice(this._cursor, this._cursor + 4).readInt32LE(0);
  this._cursor += 4;
  return ret;
};

/**
 * @param {Number} val [optional]
 * @return {Message|BigInt}
 */

Message.prototype.int64 = function(val) {
  if (val) {
    // TODO:
  }
  var buf = this._buffers.slice(this._cursor, this._cursor + 8);
  this._cursor += 8;
  return bigint.fromBuffer(buf, { endinan: 'little' });
};

/**
 * @param {Boolean} val
 * @return {Boolean}
 */

Message.prototype.bool = function(val) {
  if (val || false === val) {
    return this.uchar(val ? 1 : 0);
  }
  return !!this.uchar();
};

/**
 * @return {String}
 */

Message.prototype.ip = function() {
  var ip = this.uint32()
    , buf = new Buffer(4);

  buf.writeUInt32BE(ip, 0);
  return [buf[0], buf[1], buf[2], buf[3]].join('.');
};

/**
 * @param {Buffer} buffer
 * @return {Message}
 */

Message.prototype.push = function(buffer) {
  this._buffers.push(buffer);
  return this;
};

/**
 * Decompress gzipped message.
 *
 * @param {Function} callback
 * @return {Message}
 */

Message.prototype.decompress = function(callback) {
  var buf = this._buffers.splice(4).toBuffer();

  zlib.unzip(buf, function(err, buf) {
    if (err) {
      return callback.call(this, err, buf);
    }
    this._buffers.push(buf);
    callback.call(this, err, this);
  }.bind(this));

  return this;
};

/**
 * Decode buffered message.
 *
 * @param {String} type
 * @param {Function} callback
 * @return {Message}
 */

Message.prototype.decode = function(type, callback) {
  this._cursor = 0;
  var code = this.uint32();

  debug('%s:%s', type, code/*, this._buffers */);

  switch (type) {
    case 'server':
      var message = Message.SERVER[code];
      break;
    case 'peer':
      var message = Message.PEER[code];
      break;
    case 'distributed':
      var message = Message.DISTRIBUTED[code];
      break;
    default:
      throw new TypeError('Unknown message type [' + type + ']');
  }

  if (!message) {
    throw new Error('Unknown ' + type + ' message code [' + code + ']');
  }

  this.name = message.name;

  switch (message.decode.length) {
    case 2:
      message.decode.call(this, this, callback);
      break;
    case 1:
      var decoded = message.decode.call(this, this);
      callback(null, decoded);
      break;
    default:
      throw new Error('invalid parameters');
  }

  return this;
};

/**
 * @param {Function} callback
 */

Message.prototype.end = function(callback) {
  var buf = new Buffer(4);

  buf.writeUInt32LE(this._buffers.length, 0);
  this._buffers.unshift(buf);
  this._cursor += 4;

  return callback.call(this, this._buffers);
};
