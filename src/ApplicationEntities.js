const { DbClient } = require("./lib/DbClient");
const { OtherThingDao } = require("./lib/OtherThingDao");
const { ThingDao } = require("./lib/ThingDao");
const { MainService } = require("./lib/MainService");

class ApplicationEntities {
  static thingDbClient;
  static otherThingDbClient;
  static thingDao;
  static otherThingDao;
  static mainSvc;

  // NOTE(Tom): For tests, you could use a different init method or use a TestApplicationEntities module
  static async init () {
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
