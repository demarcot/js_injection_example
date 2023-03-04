class Injector {
  static injectorMap = {};

  static async addInjectable (name, injectorFn, isSingleton = true) {
    if (isSingleton) {
      const o = injectorFn();
      if (o.postConstruct) {
        await o.postConstruct();
      }

      Injector.injectorMap[name] = o;
    } else {
      Injector.injectorMap[name] = async () => {
        const o = injectorFn();
        if (o.postConstruct) {
          await o.postConstruct;
        }
        return o;
      };
      Injector.injectorMap[name].isFn = true;
    }
  }

  static async getInjectable (name) {
    const i = Injector.injectorMap[name];

    if (!i) {
      throw new Error(`No injectable with provided key: ${name}`);
    }

    if (i.isFn) {
      return await i();
    } else {
      return i;
    }
  }
}

module.exports = {
  Injector
};
