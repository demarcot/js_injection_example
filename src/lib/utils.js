/**
  * Return whether input is a function
  *
  * @param {Function} fn
  *
  * @returns {Boolean}
  */
function isFunction (fn) {
  if (!fn) {
    return false;
  }

  const n = fn.constructor?.name;
  return n === 'Function' || n === 'AsyncFunction';
}

/**
  * Return whether input is a type
  *
  * @param {Object} t
  *
  * @returns {Boolean}
  */
function isType (t) {
  if (!t) {
    return false;
  }

  return !!getTypeName(t);
}

/**
  * Get the type name
  *
  * @param {Object} t
  *
  * @returns {String}
  */
function getTypeName (t) {
  return t?.prototype?.constructor?.name;
}

module.exports = {
  getTypeName,
  isType,
  isFunction
};
