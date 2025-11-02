const { MessageFlags } = require('discord.js');

async function handleInteraction(interaction) {
    if (!interaction.isChatInputCommand() && !interaction.isModalSubmit()) return;

    let commandName;
    if (interaction.isModalSubmit()) {
        if (!interaction.customId) {
            console.error('Modal submission event missing custom id');
            interaction.reply('An error occurred while processing the submission');

            return;
        }

        commandName = getCommandByModalId(interaction.customId);
        if (!commandName) {
            console.error(`No command found matching modal id ${interaction.customId}`);
            interaction.reply('An error occurred while processing the submission');

            return;
        }
    }

    if (!commandName) {
        commandName = interaction.commandName;
    }

    const command = interaction.client.commands.get(commandName);
    if (!command) {
        console.error(`No command found matching name ${commandName}`);
        interaction.reply('An error occurred while processing the command');

        return;
    }

    await handleCommand(command, interaction);
}

async function handleCommand(command, interaction) {
    try {
        if (interaction.isChatInputCommand()) {
            await command.execute(interaction);
        } else {
            await command.processModalSubmission(interaction);
        }
    } catch (err) {
        console.error(`Error handling command ${command.data.name}`, err);

        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: 'An error occurred while executing this command',
                flags: MessageFlags.Ephemeral,
            });
        } else {
            await interaction.reply({
                content: 'An error occurred while executing this command',
                flags: MessageFlags.Ephemeral,
            });
        }
    }
}

exports.handleInteraction = handleInteraction;