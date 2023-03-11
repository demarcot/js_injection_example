const { DbClient } = require("./lib/DbClient");
const { OtherThingDao } = require("./lib/OtherThingDao");
const { ThingDao } = require("./lib/ThingDao");
const { MainService } = require("./lib/MainService");
const { Injector, InjectorStrategy } = require("../");

class ApplicationEntities {
  // NOTE(Tom): For tests, you could use a different init method or use a TestApplicationEntities module
   static async init () {
    console.log('--- Initializing Application');

    // NOTE(Tom): This allows lookups by name for singleton or instantiated injectables
    console.log('- init misc');
    // This must be declared before it is ref'd since this is a dumb map
    await Injector.addInjectable({
      name: 'randNum',
      type: () => { return Math.floor(Math.random() * 10) },
      strategy: InjectorStrategy.PrototypeStrategy
    });

    console.log('- init db clients');
    await Injector.addInjectable({
      name: 'thingDbClient',
      type: () => { return new DbClient('Thing', 'localhost:3131'); }
    });
    await Injector.addInjectable({
      name: 'otherThingDbClient',
      type: () => { return new DbClient('OtherThing', 'localhost:3232'); }
    });

    console.log('- init daos');
    await Injector.addInjectable({
      type: ThingDao
    });
     await Injector.addInjectable({
       type: OtherThingDao
     });

    console.log('- init main svc');
     await Injector.addInjectable({
       type: MainService
     });


    console.log('\n--- Available Injectables:');
    console.log(Object.keys(Injector.injectorMap));
    console.log('\n');
  }
}

module.exports = {
  ApplicationEntities
}
