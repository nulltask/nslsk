
/**
 * TODO:

  6	Unknown
  13	Say in Chat Room
  14	Join Room
  15	Leave Room
  16	User Joined Room
  17	User Left Room
  23	Acknowledge Private Message
  28	Set Online Status
  32	Ping
  34	Send Speed
  35	Shared Folders & Files
  36	Get User Stats
  40	Queued Downloads
  41	Kicked from Server
  42	User Search
  51	Interest Add
  52	Interest Remove
  54	Get Recommendations
  56	Get Global Recommendations
  57	Get User Interests
  65	Exact File Search
  66	Global/Admin Message
  71	Have No Parents
  73	Parent's IP
  86	Parent Inactivity Timeout
  87	Search Inactivity Timeout
  88	Minimum Parents In Cache
  90	Distributed Alive Interval
  91	Add Privileged User
  92	Check Privileges
  93	Search Request
  100	Accept Children
  102	Net Info
  103	Wishlist Search
  110	Get Similar Users
  111	Get Item Recommendations
  112	Get Item Similar Users
  113	Room Tickers
  114	Room Ticker Add
  115	Room Ticker Remove
  116	Set Room Ticker
  117	Hated Interest Add
  118	Hated Interest Remove
  120	Room Search
  121	Send Upload Speed
  122	User Privileges
  123	Give Privileges
  124	Notify Privileges
  125	Acknowledge Notify Privileges
  126	Branch Level
  127	Branch Root
  129	Child Depth
  133	Private Room Users
  134	Private Room Add User
  135	Private Room Remove User
  136	Private Room Drop Membership
  137	Private Room Drop Ownership
  138	Private Room Unknown
  139	Private Room Added
  140	Private Room Removed
  141	Private Room Toggle
  142	New Password
  143	Private Room Add Operator
  144	Private Room Remove Operator
  145	Private Room Operator Added
  146	Private Room Operator Removed
  148	Private Room Owned
  149	Message Users
  150	Ask Public Chat
  151	Stop Public Chat
  152	Public Chat

 */

var code = module.exports = {};

/**
 * 1 - Login.
 */

var LOGIN = code.LOGIN = 1;
code[LOGIN] = { name: 'login' };
code[LOGIN].decode = function(message) {
  var success = message.uchar();
  
  if (!success) {
    return {
      success: success,
      reason: message.string()
    };
  }
  
  return {
    success: success,
    greet: message.string()
  };
};

/**
 * 2 - Set listen port.
 */

var SET_LISTEN_PORT = code.SET_LISTEN_PORT = 2;
code[SET_LISTEN_PORT] = { name: 'set listen port' };
code[SET_LISTEN_PORT].decode;

/**
 * 3 - Get peer address.
 */

var GET_PEER_ADDRESS = code.GET_PEER_ADDRESS = 3;
code[GET_PEER_ADDRESS] = { name: 'get peer address' };
code[GET_PEER_ADDRESS].decode = function(message) {
  return {
    username: message.string(),
    ip: message.ip(),
    port: message.int32()
  };
};

/**
 * 5 - Add user.
 */

var ADD_USER = code.ADD_USER = 5;
code[ADD_USER] = { name: 'add user' };
code[ADD_USER].decode = function(message) {
  var username = message.string()
    , exists = message.uchar();
  
  if (!exists) {
    return {
      username: username,
      exists: exists
    };
  }
  
  return {
    username: username,
    exists: exists,
    status: message.int32(),
    avgspeed: message.int32(),
    downloadnum: message.int64(),
    files: message.int32(),
    dirs: message.int32(),
    countryCode: message.string()
  };
};

/**
 * 7 - Get status
 */

var GET_STATUS = code.GET_STATUS = 7;
code[GET_STATUS] = { name: 'get status' };
code[GET_STATUS].decode = function(message) {
  return {
    username: message.string(),
    status: message.int32(),
    privileged: message.uchar()
  }
};

/**
 * 18 - Connect to peer.
 */

var CONNECT_TO_PEER = code.CONNECT_TO_PEER = 18;
code[CONNECT_TO_PEER] = { name: 'connect to peer' };
code[CONNECT_TO_PEER].decode = function(message) {
  return {
    username: message.string(),
    type: message.string(),
    ip: message.ip(),
    port: message.uint32(),
    token: message.uint32(),
    privileged: message.uchar()
  };
};

/**
 * 22 - Private messages.
 */

var PRIVATE_MESSAGES = code.PRIVATE_MESSAGES = 22;
code[PRIVATE_MESSAGES] = { name: 'private messages' };
code[PRIVATE_MESSAGES].decode = function(message) {
  return {
    id: message.int32(),
    timestamp: message.int32(),
    username: message.string(),
    message: message.string(),
    isAdmin: message.uchar()
  };
};

/**
 * 26 - File search.
 */

var FILE_SEARCH = code.FILE_SEARCH = 26;
code[FILE_SEARCH] = { name: 'file search' };
code[FILE_SEARCH].decode;

/**
 * 64 - Room list.
 */

var ROOM_LIST = code.ROOM_LIST = 64;
code[ROOM_LIST] = { name: 'room list' };
code[ROOM_LIST].decode = function(message) {
  var count = message.uint32()
    , rooms = [];
  
  for (var i = 0; i < count; ++i) {
    rooms[i] = { name: message.string() };
  }
  
  count = message.uint32();
  
  for (var i = 0; i < count; ++i) {
    rooms[i].users = message.uint32();
  }
  
  return rooms;
};

/**
 * 69 - Privileged users.
 */

var PRIVILEGED_USERS = code.PRIVILEGED_USERS = 69;
code[PRIVILEGED_USERS] = { name: 'privileged users' };
code[PRIVILEGED_USERS].decode = function(message) {
  var count = message.uint32()
    , users = [];
  
  for (var i = 0; i < count; ++i) {
    users[i] = message.string();
  }
  
  return { users: users };
};

/**
 * 83 - Parent min speed.
 */

var PARENT_MIN_SPEED = code.PARENT_MIN_SPEED = 83;
code[PARENT_MIN_SPEED] = { name: 'parent min speed' };
code[PARENT_MIN_SPEED].decode = function(message) {
  return { speed: message.uint32() };
};

/**
 * 84 - Parent speed ratio.
 */

var PARENT_SPEED_RATIO = code.PARENT_SPEED_RATIO = 84;
code[PARENT_SPEED_RATIO] = { name: 'parent speed ratio' };
code[PARENT_SPEED_RATIO].decode = function(message) {
  return { ratio: message.uint32() };
};

/**
 * 93 - Search request.
 */

var SEARCH_REQUEST = code.SEARCH_REQUEST = 93;
code[SEARCH_REQUEST] = { name: 'search request' };
code[SEARCH_REQUEST].decode;

/**
 * 104 - Wishlist interval.
 */

var WISHLIST_INTERVAL = code.WISHLIST_INTERVAL = 104;
code[WISHLIST_INTERVAL] = { name: 'wishlist interval' };
code[WISHLIST_INTERVAL].decode = function(message) {
  return { interval: message.uint32() };
};

/**
 * 1001 - Cannot connect.
 */

var CANNOT_CONNECT = code.CANNOT_CONNECT = 1001;
code[CANNOT_CONNECT] = { name: 'cannot connect' };
code[CANNOT_CONNECT].decode = function(message) {
  return {
    token: message.uint32() /*,
    username: message.string() */
  };
};