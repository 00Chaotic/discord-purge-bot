const { glob } = require('glob');
const { Collection } = require('discord.js');

async function loadCommands() {
    const commands = new Collection();

    const files = await glob('**/*.js', {
        absolute: true,
        cwd: __dirname,
        ignore: ['loader.js'],
    });

    for (const filePath of files) {
        const command = require(filePath);

        if ('data' in command && 'execute' in command) {
            commands.set(command.data.name, command);
        } else {
            console.error(`Command at ${filePath} is missing a required "data" or "execute" property`);
        }
    }

    return commands;
}

exports.loadCommands = loadCommands;