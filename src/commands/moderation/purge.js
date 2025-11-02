const { SlashCommandBuilder } = require('discord.js');
const { Commands } = require('../command-list');
const { createPurgeSetupModal } = require('../../ui/purge-modal');

const data = new SlashCommandBuilder()
    .setName(Commands.Moderation.Purge.Name)
    .setDescription('Schedule an inactivity purge');

async function execute(interaction) {
    await interaction.showModal(createPurgeSetupModal());
}

async function processModalSubmission(interaction) {
    // TODO: process interaction
    interaction.reply('Submission received!');
}

module.exports = {
    data,
    execute,
    processModalSubmission,
};