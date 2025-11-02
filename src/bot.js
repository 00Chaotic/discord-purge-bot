const { Client, Events, GatewayIntentBits } = require('discord.js');
const { handleInteraction } = require('./commands/handler');
const { loadCommands } = require('./commands/loader');

async function startBot() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.once(Events.ClientReady, readyClient => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });

    client.commands = await loadCommands();

    client.login(process.env.DISCORD_TOKEN);

    client.on(Events.InteractionCreate, handleInteraction);

    return client;
}

exports.startBot = startBot;