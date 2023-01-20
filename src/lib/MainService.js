class MainService {
  #thingDao;
  #otherThingDao;

  constructor (thingDao, otherThingDao) {
    this.#thingDao = thingDao;
    this.#otherThingDao = otherThingDao;
  }

  async arbitraryUseCase () {
    console.log('Some arbitrary use case like handling a Kafka msg or an HTTP req...');
    console.log([...await this.#thingDao.getThings(), ...await this.#otherThingDao.getOtherThings()]);
  }
}

module.exports = {
  MainService
};
