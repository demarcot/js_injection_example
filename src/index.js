const { ApplicationEntities } = require("./ApplicationEntities");
const { Injector } = require("./lib/Injector");


async function run () {
  await ApplicationEntities.init();
  const mainSvc = await Injector.getInjectable('mainSvc');

  await mainSvc.arbitraryUseCase();
}

run()
  .catch((error) => {
    console.error(`FATAL - App crashed: ${error}`);
  }).finally(() => {
    console.log('Application shutting down...');
  });
