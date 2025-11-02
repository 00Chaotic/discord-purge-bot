process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login();

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