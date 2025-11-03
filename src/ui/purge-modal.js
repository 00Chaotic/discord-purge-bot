const { TextInputBuilder, StringSelectMenuBuilder, ChannelSelectMenuBuilder, ModalBuilder, StringSelectMenuOptionBuilder, UserSelectMenuBuilder } = require('@discordjs/builders');
const { LabelBuilder, TextInputStyle, ChannelType, TextDisplayBuilder } = require('discord.js');

exports.createPurgeSetupModal = function() {
    const modal = new ModalBuilder().setCustomId('purgeSetupModal').setTitle('Purge Setup');

    const purgeDescription = new TextDisplayBuilder({
        content: 'Schedule an inactivity purge. An announcement will be sent to a chosen text channel to inform members. ' +
        'Members who fail to use the specified reaction emoji will be kicked once time is up.',
    });

    const channelSelect = new ChannelSelectMenuBuilder()
        .setCustomId('announcementChannelSelect')
        .setPlaceholder('Select the channel to post the announcement in')
        .addChannelTypes(ChannelType.GuildText);

    const announcementTextInput = new TextInputBuilder()
        .setCustomId('announcementTextInput')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Announcement message to be displayed. Group pings like @everyone can be used if bot has permissions');

    const durationSelect = new StringSelectMenuBuilder()
        .setCustomId('durationSelect')
        .setPlaceholder('Choose the amount of time before the purge occurs')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('1 hour')
                .setValue('1h'),
            new StringSelectMenuOptionBuilder()
                .setLabel('1 day')
                .setValue('2d'),
            new StringSelectMenuOptionBuilder()
                .setLabel('1 week')
                .setValue('1w'),
        );

    const excludedUsersSelect = new UserSelectMenuBuilder()
        .setCustomId('excludedUsersSelect')
        .setRequired(false)
        .setPlaceholder('Select any members that should not be purged regardless of activity');

    const announcementChannelLabel = new LabelBuilder().setLabel('Announcement Channel').setChannelSelectMenuComponent(channelSelect);
    const announcementTextLabel = new LabelBuilder().setLabel('Announcement Message').setTextInputComponent(announcementTextInput);
    const durationSelectLabel = new LabelBuilder().setLabel('Duration').setStringSelectMenuComponent(durationSelect);
    const excludedUsersLabel = new LabelBuilder().setLabel('Excluded Users').setUserSelectMenuComponent(excludedUsersSelect);

    modal.addTextDisplayComponents(purgeDescription);
    modal.addLabelComponents(announcementChannelLabel, announcementTextLabel, durationSelectLabel, excludedUsersLabel);

    return modal;
};