const { Injector } = require("./Injector");

class OtherThingDao {
  #dbClient;

  async postConstruct () {
    this.#dbClient = await Injector.getInjectable('otherThingDbClient');
  }

  async getOtherThings () {
    return await this.#dbClient.getAll();
  }
}

module.exports = {
  OtherThingDao
};
