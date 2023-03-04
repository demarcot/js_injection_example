const { DbClient } = require("./lib/DbClient");
const { OtherThingDao } = require("./lib/OtherThingDao");
const { ThingDao } = require("./lib/ThingDao");
const { MainService } = require("./lib/MainService");
const { Injector } = require("./lib/Injector");

class ApplicationEntities {
  static thingDbClient;
  static otherThingDbClient;
  static thingDao;
  static otherThingDao;
  static mainSvc;

  // NOTE(Tom): For tests, you could use a different init method or use a TestApplicationEntities module
   static async init () {
    // NOTE(Tom): This allows lookups by name for singleton or instantiated injectables
    console.log('--- misc injectables');
    // This must be declared before it is ref'd since this is a dumb map
    await Injector.addInjectable('randNum', () => { return Math.floor(Math.random() * 10) }, false);

    console.log('--- db injectables');
    await Injector.addInjectable('thingDbClient', () => { return new DbClient('Thing', 'localhost:3131'); });
    await Injector.addInjectable('otherThingDbClient', () => { return new DbClient('OtherThing', 'localhost:3232'); });

    console.log('--- dao injectables');
    await Injector.addInjectable('thingDao', () => { return new ThingDao(); });
    await Injector.addInjectable('otherThingDao', () => { return new OtherThingDao(); });

    console.log('--- main svc injectable');
    await Injector.addInjectable('mainSvc', () => { return new MainService() });
  }

  static async firstDraftInit () {
    // NOTE(Tom): First Draft: This version allows intellisense lookup of existing app entities
    console.log('--- connecting to dbs');
    ApplicationEntities.thingDbClient = new DbClient('Thing', 'localhost:3131');
    await ApplicationEntities.thingDbClient.connect();
    ApplicationEntities.otherThingDbClient = new DbClient('OtherThing', 'localhost:3232');
    await ApplicationEntities.otherThingDbClient.connect();

    console.log('--- creating daos');
    ApplicationEntities.thingDao = new ThingDao(ApplicationEntities.thingDbClient);
    ApplicationEntities.otherThingDao = new OtherThingDao(ApplicationEntities.otherThingDbClient);

    console.log('--- creating main service');
    ApplicationEntities.mainSvc = new MainService(ApplicationEntities.thingDao, ApplicationEntities.otherThingDao);
  }
}

module.exports = {
  ApplicationEntities
}
