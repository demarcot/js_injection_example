const { ApplicationEntities } = require("./ApplicationEntities");
const { Injector } = require("./lib/Injector");
const { MainService } = require("./lib/MainService");


async function run () {
  await ApplicationEntities.init();
  const mainSvc = await Injector.getInjectable({ type: MainService });

  await mainSvc.arbitraryUseCase();
}

run()
  .catch((error) => {
    console.error(`FATAL - App crashed: ${error}`);
  }).finally(() => {
    console.log('\n--- Application shutting down...');
  });
