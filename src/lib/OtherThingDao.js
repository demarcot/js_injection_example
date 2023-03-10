const { DbClient } = require("./DbClient");
const { Injector } = require("./Injector");

class OtherThingDao {
  /** @type {DbClient} */ #dbClient;

  async postConstruct () {
    this.#dbClient = await Injector.getInjectable({ name: 'otherThingDbClient' });
  }

  async getOtherThings () {
    return await this.#dbClient.getAll();
  }
}

module.exports = {
  OtherThingDao
};
