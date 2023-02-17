const fastify = require('fastify')({logger: true});
const delay = parseInt(process.env.START_DELAY);
const runInNewContext = require('vm').runInNewContext;

require('v8').setFlagsFromString('--expose_gc');

let isHealthy = true;
let leakyArrays = [];

fastify.get('/ping', async () => {
  if(isHealthy) {
    return 'pong\n';
  } else {
    throw new Error('app is unhealthy');
  }
});

// consumes a fixed amount of memory (~480MB)
fastify.get('/leak', async () => {
  // don't block thread and spin up a dozen more
  for(let i = 0; i < 12; i++) {
    setTimeout(() => {
      for(let j = 0; j < 1024*5; j++) {
        let arr = [];
        for(let k = 0; k < 1024; k++) {
          arr.push("12345678");
        }
        leakyArrays.push(arr);
      }
    }, 1);
  }
  return 'consuming memory!\n';
});

fastify.get('/unleak', async () => {
  leakyArrays = [];

  // trigger full garbage collection
  runInNewContext('gc')();

  return 'releasing memory!\n';
});

// should really be POST, but done as GET for simplicity
fastify.get('/togglesick', async () => {
  isHealthy = !isHealthy;
});

fastify.get('/destruct', async () => {
  process.exit(1);
});

const start = async () => {
  try {
    await fastify.listen({
      host: '0.0.0.0',
      port: 3000
    });
  } catch(err) {
    fastify.log.error(err);
    process.exit(1);
  }
}
setTimeout(start, delay);
