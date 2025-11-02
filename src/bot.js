const { Client, Events, GatewayIntentBits, MessageFlags } = require('discord.js');
const { loadCommands } = require('./commands/loader');

async function startBot() {
    const client = new Client({ intents: [GatewayIntentBits.Guilds] });

    client.once(Events.ClientReady, readyClient => {
        console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    });

    client.commands = await loadCommands();

    client.login(process.env.DISCORD_TOKEN);

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        if (!command) {
            console.error(`No command found matching name ${interaction.commandName}`);
        }

        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(err);

            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({
                    content: 'There was an error while executing this command',
                    flags: MessageFlags.Ephemeral,
                });
            } else {
                await interaction.reply({
                    content: 'There was an error while executing this command',
                    flags: MessageFlags.Ephemeral,
                });
            }
        }
    });

    return client;
}

exports.startBot = startBot;