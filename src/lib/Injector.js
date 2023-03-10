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

class InjectableOptions {
  /** @type {String} */ name;
  /** @type {Class} */type;
  /** @type {InjectorStrategy} */ strategy;
}

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
  Injector,
  InjectorStrategy,
  InjectableIdentifier,
  InjectableOptions
};



