const { Client: { plugin } } = require('klasa');

module.exports = {
	KlasaTextChannel: require('./lib/extensions/KlasaTextChannel'),
	TextChannelGateway: require('./lib/settings/TextChannelGateway'),
	Client: require('./lib/Client'),
	[plugin]: require('./lib/Client')[plugin]
};

/**
 * @external Guild
 * @see {@link https://discord.js.org/#/docs/main/master/class/Guild}
 */
/**
 * @external ChannelStore
 * @see {@link https://discord.js.org/#/docs/main/master/class/ChannelStore}
 */
/**
 * @external TextChannel
 * @see {@link https://discord.js.org/#/docs/main/master/class/TextChannel}
 */
/**
 * @external Settings
 * @see {@link https://klasa.js.org/#/docs/klasa/master/class/Settings}
 */
/**
 * @external GatewayStorage
 * @see {@link https://klasa.js.org/#/docs/klasa/master/class/GatewayStorage}
 */
/**
 * @external GatewayDriver
 * @see {@link https://klasa.js.org/#/docs/klasa/master/class/GatewayDriver}
 */
/**
 * @external Schema
 * @see {@link https://klasa.js.org/#/docs/klasa/master/class/Schema}
 */
/**
 * @external Collection
 * @see {@link https://discord.js.org/#/docs/main/master/class/Collection}
 */
/**
 * @external GatewayGetPathOptions
 * @see {@link https://klasa.js.org/#/docs/klasa/master/typedef/GatewayGetPathOptions}
 */
/**
 * @external GatewayJSON
 * @see {@link https://klasa.js.org/#/docs/klasa/master/typedef/GatewayJSON}
 */
/**
 * @external SettingsJSON
 * @see {@link https://klasa.js.org/#/docs/klasa/master/typedef/SettingsJSON}
 */
