const { Injector } = require("./Injector");
const { OtherThingDao } = require("./OtherThingDao");
const { ThingDao } = require("./ThingDao");

class MainService {
  /** @type {ThingDao} */ #thingDao;
  /** @type {OtherThingDao} */ #otherThingDao;

  async postConstruct () {
    this.#thingDao = await Injector.getInjectable({ type: ThingDao });
    this.#otherThingDao = await Injector.getInjectable({ type: OtherThingDao });
  }

  async arbitraryUseCase () {
    console.log('--- Running Application');
    console.log('Some arbitrary use case like handling a Kafka msg or an HTTP req...');
    console.log([...await this.#thingDao.getThings(), ...await this.#otherThingDao.getOtherThings()]);
  }
}

module.exports = {
  MainService
};
