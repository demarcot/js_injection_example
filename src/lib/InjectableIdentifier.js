const { getTypeName } = require('./utils');

class InjectableIdentifier {
  /** @type {String} */ name;
  /** @type {Class} */ type;

  /**
    * Returns an injectable id as a string name
    *
    * @param {InjectableIdentifier} id
    *
    * @returns {String}
    */
  static asString (id) {
    let str = '';
    if (id.name) {
      str += id.name;
    } else {
      str += 'default';
    }

    if (id.type && str === 'default') {
      str += getTypeName(id.type) || '';
    }

    return str;
  }

  toString () {
    return InjectableIdentifier.asString(this);
  }
}

module.exports = {
  InjectableIdentifier
};
