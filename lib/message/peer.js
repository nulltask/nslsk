
/**
 * TODO:
 *
 * 4	Shares Request
 * 5	Shares Reply
 * 8	Search Request
 * 16	Info Reply
 * 36	Folder Contents Request
 * 37	Folder Contents Reply
 * 40  	Transfer Request
 * 41	Upload Reply
 * 41	Download Reply
 * 41	Transfer Reply
 * 42	Upload Placehold
 * 43	Queue Download
 * 44	Upload Queue Notification
 * 46	Upload Failed
 * 50	Queue Failed
 * 51	Place In Queue Request
 * 52	Upload Queue Notification
 */

var code = module.exports = {};

/**
 * 0 - Pierce firewall.
 */

var PIERCE_FIREWALL = code.PIERCE_FIREWALL = 0;
code[PIERCE_FIREWALL] = { name: 'pierce firewall' };
code[PIERCE_FIREWALL].decode = function(message) {
  // TODO:
  return {};
};

/**
 * 1 - Peer init.
 */

var PEER_INIT = code.PEER_INIT = 1;
code[PEER_INIT] = { name: 'peer init' };
code[PEER_INIT].decode = function(message) {
  // TODO:
  return {};
};

/**
 * 9 - Search reply.
 */

var SEARCH_REPLY = code.SEARCH_REPLY = 9;
code[SEARCH_REPLY] = { name: 'search reply' };
code[SEARCH_REPLY].decode = function(message, callback) {
  message.decompress(function(err, message) {
    console.log(message);
    var user = message.string()
      , ticket = message.int32()
      , count = message.int32()
      , results = [];
    
    for (var i = 0; i < count; ++i) {
      message.uchar(); // forward cursor. (what?)
      
      results[i] = {
        filename: message.string(),
        size: message.int64(),
        ext: message.string(),
        attributes: []
      };
      
      var attrCount = message.int32();
      for (var j = 0; j < attrCount; ++j) {
        results[i].attributes[j] = {
          place: message.int32(),
          attribute: message.int32()
        }
      }
    }
    
    callback.call(message, err, {
      user: user,
      ticket: ticket,
      results: results,
      slotfree: message.uchar(),
      avgspeed: message.int32(),
      queueLength: message.int64()
    });
  });
}

/**
 * 15 - Info request.
 */

var INFO_REQUEST = code.INFO_REQUEST = 15;
code[INFO_REQUEST] = { name: 'info request' };
code[INFO_REQUEST].decode = function(message) {
  // TODO:
  return {};
};