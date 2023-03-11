const { InjectableIdentifier } = require('./InjectableIdentifier');
const { isFunction, isType } = require('./utils');

class InjectorStrategy {
  constructor () {
    throw new Error("Cannot instantiate");
  }

  /**
    * Creates injectable as a shared reference
    *
    * @async
    *
    * @param {Object} injectorMap
    * @param {InjectableOptions} injectableOptions
    */
  static async #sharedStrategyFn (injectorMap, injectableOptions) {
    const idStr = InjectableIdentifier.asString({ name: injectableOptions.name, type: injectableOptions.type });
    let o;

    if (isType(injectableOptions.type)) {
      o = new injectableOptions.type();
    } else if (isFunction(injectableOptions.type)) {
      o = await injectableOptions.type(); // The await should ideally not be needed
    } else {
      console.error('Type is not a type or fn...');
      throw new Error('Type is not a type or fn...');
    }

    if (o.postConstruct) {
      await o.postConstruct();
    }

    injectorMap[idStr] = o;
  }

  /**
    * Creates injectable as a shared reference
    *
    * @type {async function(): void}
    */
  static SharedStrategy = InjectorStrategy.#sharedStrategyFn;

  /**
    * Creates injectable as a shared reference
    *
    * @async
    *
    * @param {Object} injectorMap
    * @param {InjectableOptions} injectableOptions
    */
  static async #prototypeStrategyFn (injectorMap, injectableOptions) {
    const idStr = InjectableIdentifier.asString({ name: injectableOptions.name, type: injectableOptions.type });

    injectorMap[idStr] = async () => {
      let o;
      if (isType(injectableOptions.type)) {
        o = new injectableOptions.type();
      } else if (isFunction(injectableOptions.type)) {
        o = await injectableOptions.type(); // The await should ideally not be needed
      } else {
        console.error('Type is not a type or fn...');
        throw new Error('Type is not a type or fn...');
      }

      if (o.postConstruct) {
        await o.postConstruct();
      }
      return o;
    };

    injectorMap[idStr].isFn = true;
  }

  /**
    * Creates injectable as a new reference
    *
    * @type {async function(): void}
    */
  static PrototypeStrategy = InjectorStrategy.#prototypeStrategyFn;
}

module.exports = {
  InjectorStrategy
};
