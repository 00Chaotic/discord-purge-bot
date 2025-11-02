const { TextInputBuilder } = require('@discordjs/builders');
const { ChannelSelectMenuBuilder } = require('@discordjs/builders');
const { ModalBuilder } = require('@discordjs/builders');
const { LabelBuilder, TextInputStyle, ChannelType, TextDisplayBuilder } = require('discord.js');

exports.createPurgeSetupModal = function() {
    const modal = new ModalBuilder().setCustomId('purgeSetupModal').setTitle('Purge Setup');

    const purgeDescription = new TextDisplayBuilder({
        content: 'Schedule an inactivity purge. An announcement will be sent to a chosen text channel to inform members. ' +
        'Members who fail to use the specified reaction emoji will be kicked once time is up.',
    });

    const channelSelect = new ChannelSelectMenuBuilder()
        .setCustomId('announcementChannelSelect')
        .setRequired(true)
        .setPlaceholder('Select the channel to post the announcement in')
        .addChannelTypes(ChannelType.GuildText);

    const announcementTextInput = new TextInputBuilder()
        .setCustomId('announcementTextInput')
        .setRequired(true)
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Announcement message to be displayed. Group pings like @everyone can be used if bot has permissions');

    const announcementChannelLabel = new LabelBuilder().setLabel('Announcement Channel').setChannelSelectMenuComponent(channelSelect);
    const announcementTextLabel = new LabelBuilder().setLabel('Announcement Message').setTextInputComponent(announcementTextInput);

    modal.addTextDisplayComponents(purgeDescription);
    modal.addLabelComponents(announcementChannelLabel, announcementTextLabel);

    return modal;
};