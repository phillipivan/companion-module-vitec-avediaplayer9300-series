import { Regex } from '@companion-module/base'
import { mode } from './choices.js'

export default async function (self) {
	self.setActionDefinitions({
		currentMode: {
			name: 'Mode',
			options: [
				{
					id: 'mode',
					type: 'dropdown',
					label: 'Mode',
					default: 'av',
					choices: mode,
					allowCustom: true,
				},
			],
			callback: async ({ options }) => {
				if (self.axios === undefined) {
					return undefined
				}
				await self.queue.add(
					async () => {
						try {
							const response = await self.axios.post('', JSON.stringify({ params: { currentMode: options.mode } }))
							self.logResponse(response)
							self.getMode()
						} catch (error) {
							self.logError(error)
						}
					},
					{ priority: 1 },
				)
			},
			subscribe: async () => {
				await self.queue.add(
					async () => {
						await self.getMode()
					},
					{ priority: 0 },
				)
			},
		},
		currentChannel: {
			name: 'Current Channel',
			options: [
				{
					id: 'uri',
					type: 'dropdown',
					label: 'URI',
					choices: self.r9300.channelList,
					default: '',
					regex: Regex.SOMETHING,
					allowCustom: true,
					tooltip: 'Should be formatted similar to: udp://239.192.65.2:5000?hwchan=1',
				},
			],
			callback: async ({ options }, context) => {
				let uri = await context.parseVariablesInString(options.uri)
				if (self.axios === undefined || uri === undefined) {
					return undefined
				}
				await self.queue.add(
					async () => {
						try {
							const response = await self.axios.post('', JSON.stringify({ params: { currentChannel: uri } }))
							self.logResponse(response)
							self.getChannel()
						} catch (error) {
							self.logError(error)
						}
					},
					{ priority: 1 },
				)
			},
			subscribe: async () => {
				await self.queue.add(
					async () => {
						await self.getChannel()
					},
					{ priority: 0 },
				)
			},
			learn: async (action) => {
				const newChannel = await self.queue.add(
					async () => {
						return await self.getChannel()
					},
					{ priority: 1 },
				)
				if (newChannel === undefined) {
					return undefined
				}
				return {
					...action.options,
					uri: newChannel,
				}
			},
		},
		volume: {
			name: 'Volume',
			options: [
				{
					id: 'vol',
					type: 'number',
					label: 'Volume',
					default: 30,
					min: 0,
					max: 40,
					range: true,
					step: 1,
					isVisible: (options) => {
						return !options.useVar
					},
				},
				{
					id: 'volVar',
					type: 'textinput',
					default: '',
					useVariables: { local: true },
					regex: Regex.SOMETHING,
					isVisible: (options) => {
						return options.useVar
					},
					tooltip: 'Variable should return an integer between 0 and 40',
				},
				{
					id: 'useVar',
					type: 'checkbox',
					label: 'Use Variable',
					default: false,
				},
			],
			callback: async ({ options }, context) => {
				if (self.axios === undefined) {
					return undefined
				}
				let vol = options.vol
				if (options.useVar) {
					vol = parseInt(await context.parseVariablesInString(options.volVar))
					if (isNaN(vol) || vol < 0 || vol > 40) {
						self.log('warn', `an out of range variable has been passed to action.volume: ${vol}`)
						return undefined
					}
				}
				await self.queue.add(
					async () => {
						try {
							const response = await self.axios.post('', JSON.stringify({ params: { volume: vol } }))
							self.logResponse(response)
							self.getVolume()
						} catch (error) {
							self.logError(error)
						}
					},
					{ priority: 1 },
				)
			},
			subscribe: async () => {
				await self.queue.add(
					async () => {
						await self.getVolume()
					},
					{ priority: 0 },
				)
			},
			learn: async (action) => {
				const newVol = await self.queue.add(
					async () => {
						return await self.getVolume()
					},
					{ priority: 1 },
				)
				if (newVol === undefined) {
					return undefined
				}
				return {
					...action.options,
					vol: newVol,
				}
			},
		},
		volumeUp: {
			name: 'Volume Up',
			options: [],
			callback: async () => {
				if (self.axios === undefined) {
					return undefined
				}
				await self.queue.add(
					async () => {
						try {
							const response = await self.axios.post('', JSON.stringify({ params: { volumeup: 'volumeup' } }))
							self.logResponse(response)
						} catch (error) {
							self.logError(error)
						}
					},
					{ priority: 1 },
				)
			},
		},
		volumeDown: {
			name: 'Volume Down',
			options: [],
			callback: async () => {
				if (self.axios === undefined) {
					return undefined
				}
				await self.queue.add(
					async () => {
						try {
							const response = await self.axios.post('', JSON.stringify({ params: { volumedown: 'volumedown' } }))
							self.logResponse(response)
							self.getVolume()
						} catch (error) {
							self.logError(error)
						}
					},
					{ priority: 1 },
				)
			},
		},
		mute: {
			name: 'Mute',
			options: [
				{
					id: 'mute',
					type: 'checkbox',
					label: 'Mute',
					default: false,
				},
			],
			callback: async ({ options }) => {
				if (self.axios === undefined) {
					return undefined
				}
				await self.queue.add(
					async () => {
						try {
							const response = await self.axios.post('', JSON.stringify({ params: { mute: options.mute } }))
							self.logResponse(response)
							self.getMute()
						} catch (error) {
							self.logError(error)
						}
					},
					{ priority: 1 },
				)
			},
			subscribe: async () => {
				await self.queue.add(
					async () => {
						await self.getMute()
					},
					{ priority: 0 },
				)
			},
		},
		teletext: {
			name: 'Teletext',
			options: [
				{
					id: 'teletext',
					type: 'checkbox',
					label: 'Teletext',
					default: false,
				},
			],
			callback: async ({ options }) => {
				if (self.axios === undefined) {
					return undefined
				}
				await self.queue.add(
					async () => {
						try {
							let msg = options.teletext ? 'on' : 'off'
							const response = await self.axios.post('', JSON.stringify({ params: { teletext: msg } }))
							self.logResponse(response)
							self.getTeletext()
						} catch (error) {
							self.logError(error)
						}
					},
					{ priority: 1 },
				)
			},
			subscribe: async () => {
				await self.queue.add(
					async () => {
						await self.getTeletext()
					},
					{ priority: 0 },
				)
			},
		},
		channelList: {
			name: 'Channel List',
			options: [],
			callback: async () => {
				await self.queue.add(
					async () => {
						await self.updateChannelList()
					},
					{ priority: 1 },
				)
			},
			subscribe: async () => {
				await self.queue.add(
					async () => {
						await self.updateChannelList()
					},
					{ priority: 0 },
				)
			},
		},
	})
}
