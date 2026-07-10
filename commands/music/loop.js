const { SlashCommandBuilder } = require('discord.js');
const { checkVoiceChannel } = require('../../utils/voiceChannelCheck.js');
const { checkCurrentTrack } = require('../../utils/playerValidation.js');
const { sendSuccessResponse, handleCommandError, safeDeferReply } = require('../../utils/responseHandler.js');
const { getLang } = require('../../utils/languageLoader');

const data = new SlashCommandBuilder()
  .setName("loop")
  .setDescription("Toggle or set the loop mode (track / queue / off)")
  .addStringOption(option =>
    option.setName("mode")
      .setDescription("Set a specific loop mode (leave empty to cycle)")
      .setRequired(false)
      .addChoices(
        { name: 'Track', value: 'track' },
        { name: 'Queue', value: 'queue' },
        { name: 'Off', value: 'none' }
      )
  );

module.exports = {
    data: data,
    run: async (client, interaction) => {
        try {
            const deferred = await safeDeferReply(interaction);
            if (!deferred && !interaction.deferred && !interaction.replied) return;
            const lang = await getLang(interaction.guildId);
            const t = lang.music.loop;

            const player = client.riffy.players.get(interaction.guildId);
            const check = await checkVoiceChannel(interaction, player);

            if (!check.allowed) {
                const reply = await interaction.editReply({
                    ...check.response,
                    fetchReply: true
                });
                setTimeout(() => reply.delete().catch(() => {}), 5000);
                return reply;
            }

            const trackCheck = await checkCurrentTrack(player, null, interaction.guildId);

            if (!trackCheck.valid) {
                const reply = await interaction.editReply({
                    ...trackCheck.response,
                    fetchReply: true
                });
                setTimeout(() => reply.delete().catch(() => {}), 5000);
                return reply;
            }

            const requestedMode = interaction.options.getString('mode');
            const currentMode = player.loop || "none";

            const nextMode = requestedMode
                ? requestedMode
                : currentMode === "none"
                    ? "track"
                    : currentMode === "track"
                        ? "queue"
                        : "none";

            player.setLoop(nextMode);

            const modeText = t.modes[nextMode];

            return await sendSuccessResponse(
                interaction,
                modeText.title + '\n\n' +
                modeText.message + '\n' +
                modeText.note
            );

        } catch (error) {
            const lang = await getLang(interaction.guildId).catch(() => ({ music: { loop: { errors: {} } } }));
            const t = lang.music?.loop?.errors || {};

            return await handleCommandError(
                interaction,
                error,
                'loop',
                (t.title || '## ❌ Error') + '\n\n' + (t.message || 'An error occurred while updating the loop mode.\nPlease try again later.')
            );
        }
    }
};