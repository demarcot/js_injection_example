const { DbClient } = require("./DbClient");
const { Injector } = require("../../");

class ThingDao {
  /** @type {DbClient} */ #dbClient;

  async postConstruct () {
    this.#dbClient = await Injector.getInjectable({ name: 'thingDbClient' });
  }

  async getThings () {
    return await this.#dbClient.getAll();
  }
}

module.exports = {
  ThingDao
};
