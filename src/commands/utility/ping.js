const { SlashCommandBuilder } = require('discord.js');
const commandList = require('../command-list');

const data = new SlashCommandBuilder().setName(commandList.Utility.Ping).setDescription('Replies with Pong!');

async function execute(interaction) {
    await interaction.reply('Pong!');
}

module.exports = {
    data,
    execute,
};