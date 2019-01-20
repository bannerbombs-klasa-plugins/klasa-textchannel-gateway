const { Structures } = require('discord.js');

module.exports = Structures.extend('TextChannel', TextChannel => {
	/**
	 * Klasa's Extended TextChannel
	 * @extends external:TextChannel
	 */
	class KlasaTextChannel extends TextChannel {

		/**
		 * @typedef {external:TextChannelJSON} TextChannelJSON
		 * @property {external:SettingsJSON} settings The per channel settings
		 */

		/**
		 * @param {...*} args Normal D.JS TextChannel args
		 */
		constructor(...args) {
			super(...args);

			/**
			 * The member level settings for this context (channel || default)
			 * @since 0.0.1
			 * @type {external:Settings}
			 */
			this.settings = this.client.gateways.channels.create([this.guild.id, this.id]);
		}

		/**
		 * Returns the JSON-compatible object of this instance.
		 * @since 0.5.0
		 * @returns {KlasaChannelJSON}
		 */
		toJSON() {
			return { ...super.toJSON(), settings: this.settings };
		}

	}

	return KlasaTextChannel;
});
