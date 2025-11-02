const { REST, Routes } = require('discord.js');
const { loadCommands } = require('./commands/loader');

async function deployCommands() {
    const commandData = [];

    commands = await loadCommands();
    commands.forEach(command => {
        if ('data' in command && 'execute' in command) {
            commandData.push(command.data.toJSON());
        } else {
            console.error(`Command at ${filePath} is missing a required "data" or "execute" property`);
        }
    });

    const rest = new REST().setToken(process.env.DISCORD_TOKEN);

    try {
        console.log(`Deployment started for ${commandData.length} application slash commands.`);

        const data = await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commandData });

        console.log(`Deployment complete for ${data.length} application slash commands.`);
    } catch (err) {
        console.error('Error deploying application slash commands', err);
    }
}

deployCommands();