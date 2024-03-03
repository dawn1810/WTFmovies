const resolutions = {
	"360p": {
		video: {
			height: "360",
			width: "640",
			maxrate: "856k",
			bufsize: "1200k",
		},
		audio: {
			bitrate: "96k",
		},
	},
	"540p": {
		video: {
			height: "540",
			width: "960",
			maxrate: "1498k",
			bufsize: "2100k",
		},
		audio: {
			bitrate: "128k",
		},
	},
	"720p": {
		video: {
			height: "720",
			width: "1280",
			maxrate: "2996k",
			bufsize: "4200k",
		},
		audio: {
			bitrate: "128k",
		},
	},
	"1080p": {
		video: {
			height: "1080",
			width: "1920",
			maxrate: "5350k",
			bufsize: "7500k",
		},
		audio: {
			bitrate: "192k",
		},
	},
	"1440p": {
		video: {
			height: "1440",
			width: "2560",
			maxrate: "8000k",
			bufsize: "12000k",
		},
		audio: {
			bitrate: "192k",
		},
	},
};
module.exports = resolutions;
