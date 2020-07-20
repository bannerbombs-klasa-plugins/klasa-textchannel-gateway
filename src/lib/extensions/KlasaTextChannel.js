const { Structures } = require('discord.js');

module.exports = Structures.extend('TextChannel', Channel => {
	/**
	 * Klasa's Extended GuildMember
	 * @extends external:GuildMember
	 */
	class TextChannel extends Channel {

		/**
		 * @typedef {external:GuildMemberJSON} KlasaMemberJSON
		 * @property {external:SettingsJSON} settings The per member settings
		 */

		/**
		 * @param {...*} args Normal D.JS TextChannel args
		 */
		constructor(...args) {
			super(...args);

			/**
			 * The member level settings for this context (member || default)
			 * @since 0.0.1
			 * @type {external:Settings}
			 */
			this.settings = this.client.gateways.get('channels').acquire([this.guild.id, this.id], this);
		}

		/**
		 * Returns the JSON-compatible object of this instance.
		 * @since 0.5.0
		 * @returns {KlasaMemberJSON}
		 */
		toJSON() {
			return { ...super.toJSON(), settings: this.settings.toJSON() };
		}

	}

	return TextChannel;
});
