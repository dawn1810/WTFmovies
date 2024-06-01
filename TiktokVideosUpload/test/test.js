const { promisify } = require("util");
const { exec } = require("child_process");
const execPromise = promisify(exec);
const fs = require("fs");
const path = require("path");
const resolutions = require("../res.js");

function generateUUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
async function fullresTiktokupload(listPathM3U8) {
	for (let i = 0; i < listPathM3U8.length; i++) {
		await tiktokUpload(path.dirname(listPathM3U8[i]), listPathM3U8[i]);
	}
	console.log(`Tiktok upload all done!`);
}
async function runFFmpegCommand(inputFile, outputDir) {
	try {
		// Tạo thư mục đầu ra dùng UUID để độc lập các phiên
		const randomOutputSubDir = generateUUID();
		const outputDirPath = path.join(
			__dirname,
			outputDir,
			path.basename(inputFile) + "-" + randomOutputSubDir
		);
		// Đảm bảo thư mục tồn tại
		fs.mkdirSync(outputDirPath, { recursive: true });
		// Kiểm tra thông tin video
		const ffprobePath = path.join(__dirname, "ffmpeg/bin/ffprobe.exe");
		const ffprobeCommand = `${ffprobePath} -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of default=noprint_wrappers=1:nokey=1 "${inputFile}"`;
		const { stdout: ffprobeStdout } = await execPromise(ffprobeCommand);
		const videoInfoArray = ffprobeStdout
			.trim()
			.split("\n")
			.map((item) => {
				const cleanedItem = item.replace(/\r/g, "");
				if (cleanedItem.includes("/")) {
					const [numerator, denominator] = cleanedItem.split("/").map(Number);
					return Math.round(numerator / denominator); // Trả về giá trị số sau khi chia
				}
				return Number(cleanedItem);
			});

		const videoInfo = {
			width: videoInfoArray[0],
			height: videoInfoArray[1],
			fps: videoInfoArray[2],
		};
		///////////////////////////////////////////////////
		const validResolutions = Object.entries(resolutions).filter(
			([key, value]) =>
				videoInfo.width >= value.video.width && videoInfo.height >= value.video.height
		);
		// In ra các phân giải hợp lệ
		let gpuEncoder = "";
		const gpuDetectionCommand = "wmic path win32_VideoController get name";
		const { stdout: gpuStdout } = await execPromise(gpuDetectionCommand);
		if (gpuStdout.includes("NVIDIA")) {
			gpuEncoder = "h264_nvenc";
		} else if (gpuStdout.includes("AMD")) {
			gpuEncoder = "h264_amf";
		} else if (gpuStdout.includes("Intel(R)")) {
			gpuEncoder = "h264_qsv";
		}
		// Khởi tạo lệnh ffmpeg
		const ffmpegPath = path.join(__dirname, "ffmpeg/bin/ffmpeg.exe");
		let command = `${ffmpegPath} -i "${inputFile}" `;
		const listPathM3U8 = [];
		const videoEncoder = gpuEncoder ? gpuEncoder : "libx264"; // Fallback to libx264 if no GPU encoder is found
		command +=
			"-map 0:v:0 -map 0:a:0 ".repeat(validResolutions.length) +
			`-c:v ${videoEncoder} -profile:v main -crf 20 -sc_threshold 0 -g ${videoInfo.fps * 2
			} -keyint_min ${videoInfo.fps * 2} -c:a aac -ar 48000 `;
		let var_stream_map = ``;
		validResolutions.forEach(([key, { video, audio }], index) => {
			const m3u8FilePath = path.join(outputDirPath, "v" + key, key + "_index.m3u8");
			listPathM3U8.push(m3u8FilePath);
			var_stream_map += ` v:${index},a:${index},name:${key}`;
			command += `-filter:v:${index} scale=w=${video.width}:h=${video.height}:force_original_aspect_ratio=decrease -maxrate:v:${index} ${video.maxrate} -bufsize:v:${index} ${video.bufsize} -b:a:${index} ${audio.bitrate} `;
		});

		command += `-var_stream_map "${var_stream_map}" -master_pl_name "master.m3u8" -f hls -hls_time 10 -hls_playlist_type vod -hls_list_size 0 -hls_segment_filename "${outputDirPath}/v%v/segment%d.ts" "${outputDirPath}/v%v/index.m3u8" `;
		// Thực thi lệnh ffmpeg
		const { stdout, stderr } = await execPromise(command);
		// Xuất kết quả
		console.log(`Command Output for ${inputFile}:`, stdout);
		console.error(`Command Errors for ${inputFile}:`, stderr);
		// Thông báo hoàn thành
		console.log(
			`Encoding completed for ${inputFile} with the following resolutions: ${validResolutions
				.map(([res]) => res)
				.join(", ")}`
		);
	} catch (error) {
		console.error(`Error processing ${inputFile}:`, error.message);
	}
}

runFFmpegCommand("./input/a.mkv", "./output");
