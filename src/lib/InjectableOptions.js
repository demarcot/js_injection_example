const { InjectorStrategy } = require('./InjectorStrategy');

class InjectableOptions {
  /** @type {String} */ name;
  /** @type {Class} */type;
  /** @type {InjectorStrategy} */ strategy;
}

module.exports = {
  InjectableOptions
};
