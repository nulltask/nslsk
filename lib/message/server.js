
/**
 * TODO:

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
  73	Parent's IP
  86	Parent Inactivity Timeout
  87	Search Inactivity Timeout
  88	Minimum Parents In Cache
  90	Distributed Alive Interval
  91	Add Privileged User
  93	Search Request
  100	Accept Children
  102	Net Info
  103	Wishlist Search
  110	Get Similar Users
  111	Get Item Recommendations
  112	Get Item Similar Users
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
  };
};

/**
 * 13 - Say in chat room.
 */

var SAY_IN_CHAT_ROOM = code.SAY_IN_CHAT_ROOM = 13;
code[SAY_IN_CHAT_ROOM] = { name: 'say in chat room' };
code[SAY_IN_CHAT_ROOM].decode = function(message) {
  return {
    room: message.string(),
    username: message.string(),
    message: message.string()
  };
};

/**
 * 14 - Join a room.
 */

var JOIN_ROOM = code.JOIN_ROOM = 14;
code[JOIN_ROOM] = { name: 'join room' };
code[JOIN_ROOM].decode = function(message) {
  // TODO:
  return {
    
  };
};

/**
 * 15 - Leave room.
 */

var LEAVE_ROOM = code.LEAVE_ROOM = 15;
code[LEAVE_ROOM] = { name: 'leave room' };
code[LEAVE_ROOM].decode = function(message) {
  return {
    room: message.string()
  };
};

/**
 * 16 - A user joined a room.
 */

var USER_JOINED_ROOM = code.USER_JOINED_ROOM = 16;
code[USER_JOINED_ROOM] = { name: 'user joined room' };
code[USER_JOINED_ROOM].decode = function(message) {
  return {
    room: message.string(),
    username: message.string(),
    status: message.int32(),
    avgspeed: message.int32(),
    downloadnum: message.int64(),
    files: message.int32(),
    dirs: message.int32(),
    slotsfree: message.int32(),
    countryCode: message.string()
  };
};

/**
 * 17 - User left a room.
 */

var USER_LEFT_ROOM = code.USER_LEFT_ROOM = 17;
code[USER_LEFT_ROOM] = { name: 'user left room' };
code[USER_LEFT_ROOM].decode = function(message) {
  return {
    room: message.string(),
    username: message.string()
  };
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
 * 23 - Acknowledge private message.
 */

var ACKNOWLEDGE_PRIVATE_MESSAGE = code.ACKNOWLEDGE_PRIVATE_MESSAGE = 23;
code[ACKNOWLEDGE_PRIVATE_MESSAGE] = { name: 'acknowledge private message' };
code[ACKNOWLEDGE_PRIVATE_MESSAGE].decode;

/**
 * 26 - File search.
 */

var FILE_SEARCH = code.FILE_SEARCH = 26;
code[FILE_SEARCH] = { name: 'file search' };
code[FILE_SEARCH].decode = function(message) {
  return {
    username: message.string(),
    ticket: message.int32(),
    searchQuery: message.string()
  };
};

/**
 * 28 - Set online status.
 */

var SET_ONLINE_STATUS = code.SET_ONLINE_STATUS = 28;
code[SET_ONLINE_STATUS] = { name: 'set online status' };
code[SET_ONLINE_STATUS].decode;

/**
 * 32 - Ping.
 */

var PING = code.PING = 32;
code[PING] = { name: 'ping' };
code[PING].decode = function(message) {
  // empty message.
  return {};
};

/**
 * 34 - Send speed.
 */

var SEND_SPEED = code.SEND_SPEED = 34;
code[SEND_SPEED] = { name: 'send speed' };
code[SEND_SPEED].decode;

/**
 * 35 - Shared folders & files.
 */

var SHARED_FOLDERS_AND_FILES = code.SHARED_FOLDERS_AND_FILES = 35;
code[SHARED_FOLDERS_AND_FILES] = { name: 'shared folders and files' };
code[SHARED_FOLDERS_AND_FILES].decode;

/**
 * 36 - Get user stats.
 */

var GET_USER_STATS = code.GET_USER_STATS = 36;
code[GET_USER_STATS] = { name: 'get user stats' };
code[GET_USER_STATS].decode = function(message) {
  return {
    username: message.string(),
    avgspeed: message.int32(),
    downloadnum: message.int64(),
    files: message.int32(),
    dirs: message.int32()
  };
};

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
 * 71 - Have no parents.
 */

var HAVE_NO_PARENTS = code.HAVE_NO_PARENTS = 71;
code[HAVE_NO_PARENTS] = { name: 'have no parents' };
code[HAVE_NO_PARENTS].decode;

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
 * 92 - Check privileges.
 */

var CHECK_PRIVILEGES = code.CHECK_PRIVILEGES = 92;
code[CHECK_PRIVILEGES] = { name: 'check privileges' };
code[CHECK_PRIVILEGES].decode = function(message) {
  return {
    timeLeft: message.int32()
  };
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
 * 113 - Room tickers.
 */

var ROOM_TICKERS = code.ROOM_TICKERS = 113;
code[ROOM_TICKERS] = { name: 'room tickers' };
code[ROOM_TICKERS].decode = function(message) {
  var room = message.string()
    , count = message.int32()
    , users = [];
  
  for (var i = 0; i < count; ++i) {
    users[i] = {
      user: message.string(),
      tickers: message.string()
    };
  }
  
  return {
    room: room,
    users: users
  };
};

/**
 * 114 - Room ticker add.
 */

var ROOM_TICKER_ADD = code.ROOM_TICKER_ADD = 114;
code[ROOM_TICKER_ADD] = { name: 'room ticker add' };
code[ROOM_TICKER_ADD].decode = function(message) {
  return {
    room: message.string(),
    user: message.string(),
    ticker: message.string()
  };
};

/**
 * 115 - Room ticker remove.
 */

var ROOM_TICKER_REMOVE = code.ROOM_TICKER_REMOVE = 115;
code[ROOM_TICKER_REMOVE] = { name: 'room ticker remove' };
code[ROOM_TICKER_REMOVE].decode = function(message) {
  return {
    room: message.string(),
    user: message.string()
  };
};

/**
 * 116 - Set room ticker.
 */

var SET_ROOM_TICKER = code.SET_ROOM_TICKER = 116;
code[SET_ROOM_TICKER] = { name: 'set room ticker' };
code[SET_ROOM_TICKER].decode;

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