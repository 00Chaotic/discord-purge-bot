const { startBot } = require('./bot');

let client;
startBot().then(instance => client = instance);

async function gracefulShutdown(signal) {
    console.log(`Received ${signal}. Shutting down...`);

    try {
        if (client) {
            await client.destroy();
        }

        process.exit(0);
    } catch (err) {
        console.error('Error shutting down', err);
        process.exit(1);
    }
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);