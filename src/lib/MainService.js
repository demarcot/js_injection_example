const { Injector } = require("./Injector");

class MainService {
  #thingDao;
  #otherThingDao;

  async postConstruct () {
    this.#thingDao = await Injector.getInjectable('thingDao');
    this.#otherThingDao = await Injector.getInjectable('otherThingDao');
  }

  async arbitraryUseCase () {
    console.log('Some arbitrary use case like handling a Kafka msg or an HTTP req...');
    console.log([...await this.#thingDao.getThings(), ...await this.#otherThingDao.getOtherThings()]);
  }
}

module.exports = {
  MainService
};
