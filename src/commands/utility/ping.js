const { SlashCommandBuilder } = require('discord.js');
const { Commands } = require('../command-list');

const data = new SlashCommandBuilder().setName(Commands.Utility.Ping.Name).setDescription('Replies with Pong!');

async function execute(interaction) {
    await interaction.reply('Pong!');
}

module.exports = {
    data,
    execute,
};