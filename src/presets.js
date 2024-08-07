import { combineRgb } from '@companion-module/base'

const icons = {
	unmuted:
		'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',
	muted:
		'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CRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAFiKWH2AAAGi0lEQVQSYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAIIECCMAQQQQACBkAABEmKjEAIIIIAAAcIYQAABBBAICRAgITYKIYAAAggQIIwBBBBAAIGQAAESYqMQAggggAABwhhAAAEEEAgJECAhNgohgAACCBAgjAEEEEAAgZAAARJioxACCCCAAAHCGEAAAQQQCAkQICE2CiGAAAII/B9eTDEYalc5YQAAAABJRU5ErkJggg==',
}
export default async function (self) {
	let presets = {}
	presets[`mute`] = {
		type: 'button',
		category: 'Audio',
		name: `Mute`,
		style: {
			text: `Volume:\\n$(generic-module:volume)`,
			size: '14',
			alignment: 'center:bottom',
			pngalignment: 'center:center',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'mute',
						options: {
							mute: true,
						},
					},
				],
				up: [],
			},
			{
				down: [
					{
						actionId: 'mute',
						options: {
							mute: false,
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'mute',
				options: {},
				style: {
					png64: icons.muted,
				},
			},
			{
				feedbackId: 'mute',
				options: {},
				style: {
					png64: icons.unmuted,
				},
				isInverted: true,
			},
		],
	}
	presets[`volume_down`] = {
		type: 'button',
		category: 'Audio',
		name: `Volume Down`,
		style: {
			text: `-`,
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'volumeDown',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}
	presets[`volume_up`] = {
		type: 'button',
		category: 'Audio',
		name: `Volume Up`,
		style: {
			text: `+`,
			size: 'auto',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'volumeUp',
						options: {},
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	}
	presets[`rotary_volume`] = {
		type: 'button',
		category: 'Audio',
		name: `Rotary Volume`,
		style: {
			text: `Rotary`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		steps: [
			{
				down: [
					{
						actionId: 'mute',
						options: {
							mute: true,
						},
					},
				],
				up: [],
				rotate_left: [
					{
						actionId: 'volumeDown',
						options: {},
					},
				],
				rotate_right: [
					{
						actionId: 'volumeUp',
						options: {},
					},
				],
			},
			{
				down: [
					{
						actionId: 'mute',
						options: {
							mute: false,
						},
					},
				],
				up: [],
				rotate_left: [
					{
						actionId: 'volumeDown',
						options: {},
					},
				],
				rotate_right: [
					{
						actionId: 'volumeUp',
						options: {},
					},
				],
			},
		],
		feedbacks: [],
	}
	presets[`mode_off`] = {
		type: 'button',
		category: 'Mode',
		name: `Off`,
		style: {
			text: `Off`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: 'default',
		},
		steps: [
			{
				down: [
					{
						actionId: 'currentMode',
						options: {
							mode: 'off',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'currentMode',
				options: {
					mode: 'off',
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(255, 0, 0),
				},
			},
		],
	}
	presets[`mode_av`] = {
		type: 'button',
		category: 'Mode',
		name: `AV`,
		style: {
			text: `AV`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: 'default',
		},
		steps: [
			{
				down: [
					{
						actionId: 'currentMode',
						options: {
							mode: 'av',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'currentMode',
				options: {
					mode: 'av',
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(0, 204, 0),
				},
			},
		],
	}
	presets[`mode_browser`] = {
		type: 'button',
		category: 'Mode',
		name: `Browser`,
		style: {
			text: `Browser`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: 'default',
		},
		steps: [
			{
				down: [
					{
						actionId: 'currentMode',
						options: {
							mode: 'browser',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'currentMode',
				options: {
					mode: 'browser',
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(0, 204, 0),
				},
			},
		],
	}
	presets[`mode_splash`] = {
		type: 'button',
		category: 'Mode',
		name: `Splash`,
		style: {
			text: `Splash`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: 'default',
		},
		steps: [
			{
				down: [
					{
						actionId: 'currentMode',
						options: {
							mode: 'splash',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'currentMode',
				options: {
					mode: 'splash',
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(0, 204, 0),
				},
			},
		],
	}
	presets[`mode_signage`] = {
		type: 'button',
		category: 'Mode',
		name: `Signage`,
		style: {
			text: `Signage`,
			size: '14',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: 'default',
		},
		steps: [
			{
				down: [
					{
						actionId: 'currentMode',
						options: {
							mode: 'signage',
						},
					},
				],
				up: [],
			},
		],
		feedbacks: [
			{
				feedbackId: 'currentMode',
				options: {
					mode: 'signage',
				},
				style: {
					color: combineRgb(0, 0, 0),
					bgcolor: combineRgb(0, 204, 0),
				},
			},
		],
	}
	self.r9300.channelList.forEach((channel) => {
		presets[`setChannel_${channel.id}`] = {
			type: 'button',
			category: 'Set Channel',
			name: `${channel.label}`,
			style: {
				text: `${channel.label}`,
				size: 'auto',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				show_topbar: 'default',
			},
			steps: [
				{
					down: [
						{
							actionId: 'currentChannel',
							options: {
								uri: channel.id,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [
				{
					feedbackId: 'currentChannel',
					options: {
						uri: channel.id,
					},
					style: {
						color: combineRgb(0, 0, 0),
						bgcolor: combineRgb(0, 204, 0),
					},
				},
			],
		}
	})
	self.setPresetDefinitions(presets)
}
