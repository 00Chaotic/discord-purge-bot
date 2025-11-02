/**
 * List of available command names
 * @enum {string}
 * @readonly
 */
const Commands = Object.freeze({
    Moderation: {
        Purge: {
            Name: 'purge',
            ModalId: 'purgeSetupModal',
        },
    },
    Utility: {
        Ping: {
            Name: 'ping',
        },
    },
});

// Reverse lookup map for easier command lookups using modal ids
const modalIdToCommand = new Map();

function buildModalIdMap(obj) {
    for (const category of Object.values(obj)) {
        for (const command of Object.values(category)) {
            if (command.ModalId) {
                modalIdToCommand.set(command.ModalId, command.Name);
            }
        }
    }
}

buildModalIdMap(Commands);

function getCommandByModalId(modalId) {
    return modalIdToCommand.get(modalId);
}

module.exports = {
    Commands,
    getCommandByModalId,
};