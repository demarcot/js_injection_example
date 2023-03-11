const { InjectableOptions } = require('./InjectableOptions');
const { InjectableIdentifier } = require('./InjectableIdentifier');
const { InjectorStrategy } = require('./InjectorStrategy');
const { getTypeName } = require('./utils');

class Injector {
  static injectorMap = {};

  /**
    * Register an injectable
    *
    * @async
    *
    * @param {InjectableOptions} injectableOptions
    */
  static async addInjectable (injectableOptions) {
    if (!injectableOptions.strategy) {
      injectableOptions.strategy = InjectorStrategy.SharedStrategy;
    }

    await injectableOptions.strategy(Injector.injectorMap, injectableOptions);
  }

  /**
    * Get the injectable
    *
    * @async
    *
    * @param {InjectableIdentifier} id
    *
    * @returns {Object}
    */
  static async getInjectable (id) {
    const idStr = InjectableIdentifier.asString(id);
    const i = Injector.injectorMap[idStr];

    if (!i) {
      throw new Error(`No injectable with provided key: ${idStr}`);
    }

    if (i.isFn) {
      return await i();
    } else {
      return i;
    }
  }
}

module.exports = {
  Injector,
  InjectorStrategy,
  InjectableIdentifier,
  InjectableOptions
};



