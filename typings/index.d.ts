declare module 'klasa-textchannel-gateway' {

	import {
		TextChannel,
		Snowflake,
		Collection
	} from 'discord.js';
	import {
		Client,
		Schema,
		Settings,
		GatewayStorage,
		GatewayDriver,
		GuildResolvable,
		GatewayGetPathOptions,
		GatewayGetPathResult
	} from 'klasa';

	class TextChannelGatewayClient extends Client {
		public static defaultTextChannelsSchema: Schema;
	}

	export { TextChannelGatewayClient as Client };

	export class KlasaTextChannel extends TextChannel {
		public settings: Settings;
		public toJSON(): KlasaTextChannelJSON;
	}

	export class TextChannelGateway extends GatewayStorage {
		public store: GatewayDriver;
		public syncQueue: Collection<string, Promise<Settings>>;
		public readonly Settings: Settings;
		public readonly idLength: number;
		private _synced: boolean;

		public get(id: string | [Snowflake, Snowflake]): Settings | null;
		public create(id: string | [Snowflake, Snowflake], data?: Object): Settings;
		public sync(input: string): Promise<Settings>;
		public sync(input?: string[]): Promise<this>;
	}

	export type KlasaTextChannelJSON = {
		guildID: Snowflake;
		channelID: Snowflake;
		deleted: boolean;
		settings: Settings;
	};
}
