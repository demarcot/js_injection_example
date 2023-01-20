const { ApplicationEntities } = require("./ApplicationEntities")


async function run () {
  await ApplicationEntities.init();
  await ApplicationEntities.mainSvc.arbitraryUseCase();
}

run()
  .catch((error) => {
    console.error(`FATAL - App crashed: ${error}`);
  }).finally(() => {
    console.log('Application shutting down...');
  });
