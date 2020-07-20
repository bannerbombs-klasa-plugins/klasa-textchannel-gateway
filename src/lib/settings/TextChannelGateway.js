const { GatewayStorage, Settings, util: { getIdentifier } } = require('klasa');
const { RequestHandler } = require('@klasa/request-handler');

/**
 * The Gateway class that manages the data input, parsing, and output, of an entire database, while keeping a cache system sync with the changes.
 * @extends GatewayStorage
 */
class TextChannelGateway extends GatewayStorage {

	/**
	 * @since 0.0.1
	 * @param {external:KlasaClient} client The KlasaClient instance which initiated this instance
	 * @param {string} name The name of this Gateway
	 * @param {external:GatewayOptions} [options = {}] The options for this gateway
	 */
	constructor(client, name, options) {
		super(client, name, options);

		/**
		 * The synchronization queue for all Settings instances
		 * @since 0.0.1
		 * @type {WeakMap<string, Promise<external:Settings>>}
		 */
		this.requestHandler = new RequestHandler(id => this.provider.get(this.name, id), ids => this.provider.getAll(this.name, ids));

		/**
		 * @since 0.0.1
		 * @type {boolean}
		 * @private
		 */
		Object.defineProperty(this, '_synced', { value: false, writable: true });
	}

	/**
	 * The ID length for all entries.
	 * @since 0.0.1
	 * @type {number}
	 * @readonly
	 * @private
	 */
	get idLength() {
		// 18 + 1 + 18: `{MEMBERID}.{GUILDID}`
		return 37;
	}

	/**
	 * Gets an entry from the cache or creates one if it does not exist
	 * @since 0.5.0
	 * @param {string|string[]} id The id for this instance
	 * @param {*} target The target that holds a Settings instance of the holder for the new one
	 * @returns {external:Settings}
	 */
	acquire(id, target) {
		return this.get(id) || this.create(id, target);
	}

	/**
	 * Get a Settings entry from this gateway
	 * @since 0.0.1
	 * @param {string|string[]} id The id for the instance to retrieve
	 * @returns {?external:Settings}
	 */
	get(id) {
		const [guildID, channelID] = typeof id === 'string' ? id.split('.') : id;

		const guild = this.client.guilds.cache.get(guildID);
		if (guild) {
			const channel = guild.channels.cache.filter((channel) => ['text'].includes(channel.type)).get(channelID);
			return channel && channel.settings;
		}

		return undefined;
	}

	/**
	 * Create a new Settings for this gateway
	 * @since 0.0.1
	 * @param {string|string[]} id The id for this instance
	 * @param {any} target The holder for this Settings instance
	 * @returns {external:Settings}
	 */
	create(id, target) {
		const [guildID, channelID] = typeof id === 'string' ? id.split('.') : id;

		const entry = this.get([guildID, channelID]);
		if (entry) return entry;

		const settings = new Settings(this, target, `${guildID}.${channelID}`);
		if (this._synced) settings.sync();
		return settings;
	}

	/**
	 * Sync either all entries from the cache with the persistent database, or a single one.
	 * @since 0.0.1
	 * @param {(Array<string>|string)} [input=Array<string>] An object containing a id property, like discord.js objects, or a string
	 * @returns {?(TextChannelGateway|external:Settings)}
	 */
	async sync(input) {
		// If the schema is empty, there's no point in running sync ops
		if (!this.schema.size) return this;
		if (typeof input === 'undefined') input = this.client.guilds.cache.reduce((keys, guild) => keys.concat(guild.channels.cache.filter((channel) => ['text'].includes(channel.type)).map(channel => channel.settings.id)), []);
		if (Array.isArray(input)) {
			this._synced = true;
			const entries = await this.provider.getAll(this.name, input);
			for (const entry of entries) {
				if (!entry) continue;
				const cache = this.get(entry.id);
				if (cache) {
					cache.existenceStatus = true;
					cache._patch(entry);
					this.client.emit('settingsSync', cache);
				}
			}

			for (const guild of this.client.guilds.cache.values()) {
				for (const channel of guild.channels.cache.filter((channel) => ['text'].includes(channel.type)).values()) if (channel.settings.existenceStatus === null) channel.settings.existenceStatus = false;
			}
			return this;
		}

		const target = getIdentifier(input);
		if (!target) throw new TypeError('The selected target could not be resolved to a string.');

		const cache = this.get(target);
		return cache ? cache.sync(true) : null;
	}
}

module.exports = TextChannelGateway;
