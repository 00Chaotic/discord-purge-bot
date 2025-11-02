const { MessageFlags } = require('discord.js');

async function handleInteraction(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
        console.error(`No command found matching name ${interaction.commandName}`);
    }

    try {
        await handleCommand(command, interaction);
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
}

async function handleCommand(command, interaction) {
    switch (command.data.name) {
    default:
        await command.execute(interaction);
    }
}

exports.handleInteraction = handleInteraction;