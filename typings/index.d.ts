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
		GatewayDriver
	} from 'klasa';

	class TextChannelGatewayClient extends Client {
		public static defaultTextChannelSchema: Schema;
	}

	export { TextChannelGatewayClient as Client };

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

}

declare module 'discord.js' {

	import { Schema, Settings } from 'klasa';

	export interface TextChannel {
		settings: Settings;
	}
						       
	export namespace Client {
		export let defaultTextChannelSchema: Schema;
	}

}
