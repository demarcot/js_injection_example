class OtherThingDao {
  #dbClient;

  constructor (dbClient) {
    this.#dbClient = dbClient;
  }

  async getOtherThings () {
    return await this.#dbClient.getAll();
  }
}

module.exports = {
  OtherThingDao
};
