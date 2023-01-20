class ThingDao {
  #dbClient;

  constructor (dbClient) {
    this.#dbClient = dbClient;
  }

  async getThings () {
    return await this.#dbClient.getAll();
  }
}

module.exports = {
  ThingDao
};
