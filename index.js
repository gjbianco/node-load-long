const fastify = require('fastify')({logger: true});
const delay = parseInt(process.env.START_DELAY);

let isHealthy = true;

fastify.get('/ping', async (req, res) => {
  if(isHealthy) {
    return 'pong\n';
  } else {
    throw new Error('app is unhealthy');
  }
});

// should really be POST, but done as GET for simplicity
fastify.get('/togglesick', async (req, res) => {
  isHealthy = !isHealthy;
});

fastify.get('/destruct', async (req, res) => {
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
