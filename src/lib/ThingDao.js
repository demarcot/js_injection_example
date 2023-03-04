const { Injector } = require("./Injector");

class ThingDao {
  #dbClient;

  async postConstruct () {
    this.#dbClient = await Injector.getInjectable('thingDbClient');
  }

  async getThings () {
    return await this.#dbClient.getAll();
  }
}

module.exports = {
  ThingDao
};
