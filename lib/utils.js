
/**
 * Module dependencies.
 */

var crypto = require('crypto');

/**
 * Generates MD5 hash by given string.
 *
 * @param {String} str
 * @return {String}
 */

exports.md5 = function(str) {
  return crypto
    .createHash('md5')
    .update(str, 'utf8')
    .digest('hex');
};