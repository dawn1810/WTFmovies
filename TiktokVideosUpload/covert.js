const fs = require("fs");
const { exec } = require("child_process");
const util = require("util");
const path = require("path");
const { uploadImagetoTiktok } = require("./upload.js");
const execPromise = util.promisify(exec);
const resolutions = require("./res.js");
function generateUUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

function makeM3U8(existingFilePath, newUrls, outputFilePath) {
	try {
		// Read the existing M3U8 file
		const existingContent = fs.readFileSync(existingFilePath, "utf-8");
		// Split the content into lines
		const lines = existingContent.split("\n");
		// Iterate through the lines and replace existing segment URLs with new URLs
		const updatedLines = [];
		for (let index = 0; index < lines.length; index++) {
			const line = lines[index];
			// Check if the line starts with "#EXTINF:" followed by "output_XXX.ts"
			if (
				line.startsWith("#EXTINF:") &&
				lines[index + 1] &&
				lines[index + 1].endsWith(".ts")
			) {
				console.log(newUrls[lines[index + 1]]);
				const newUrl = newUrls[lines[index + 1]] || ""; // Use empty string if no new URL is available
				updatedLines.push(`${line},\n${newUrl}`);
				index++; // Skip the next line containing "output_XXX.ts"
			} else {
				updatedLines.push(line);
			}
		}
		// Join the lines back into the M3U8 content
		const updatedContent = updatedLines.join("\n");
		// Write the updated content to the output file
		fs.writeFileSync(outputFilePath, updatedContent);
		console.log(`Updated M3U8 file saved at: ${outputFilePath}`);
	} catch (error) {
		console.error("Error updating M3U8 file:", error.message);
	}
}
async function injectpng(filename) {
	return new Promise((resolve, reject) => {
		fs.readFile(filename, (err, data) => {
			if (err) reject(err);
			fs.readFile(path.join("src", "base.png"), (err, image_buffer) => {
				if (err) reject(err);

				const new_file = filename.replace(".ts", ".png");
				fs.writeFile(new_file, Buffer.concat([image_buffer, data]), "binary", (err) => {
					if (err) reject(err);

					fs.unlink(filename, (err) => {
						if (err) reject(err);
						resolve(new_file);
					});
				});
			});
		});
	});
}
async function tiktokUpload(tsDirPath, m3u8FilePath) {
	try {
		// Lấy danh sách tất cả các file video trong thư mục input
		const videoFiles = fs.readdirSync(tsDirPath).filter((file) => {
			const ext = path.extname(file).toLowerCase();
			return [".ts"].includes(ext);
		});

		// Lặp qua từng file video và xử lý
		const listPng = {};
		const totalFiles = videoFiles.length;
		let processedFiles = 0;
		for (const videoFile of videoFiles) {
			const inputFile = path.join(tsDirPath, videoFile);
			const resultFile = await injectpng(inputFile);
			listPng[videoFile] = await uploadImagetoTiktok(resultFile);
			processedFiles++;
			const percentageCompleted = (processedFiles / totalFiles) * 100;
			console.log(
				`Đã xử lý: ${percentageCompleted.toFixed(2)}% (${processedFiles}/${totalFiles})`
			);
		}
		console.log("File xuất ra:", listPng);
		makeM3U8(m3u8FilePath, listPng, m3u8FilePath);
	} catch (error) {
		console.error("Lỗi:", error);
	}
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
			`-c:v ${videoEncoder} -profile:v main -crf 20 -sc_threshold 0 -g ${
				videoInfo.fps * 2
			} -keyint_min ${videoInfo.fps * 2} -c:a aac -ar 48000 `;
		let var_stream_map = ``;
		validResolutions.forEach(([key, { video, audio }], index) => {
			const m3u8FilePath = path.join(outputDirPath, "v" + key, "index.m3u8");
			listPathM3U8.push(m3u8FilePath);
			var_stream_map += ` v:${index},a:${index},name:${key}`;
			command += `-filter:v:${index} scale=w=${video.width}:h=${video.height}:force_original_aspect_ratio=decrease -maxrate:v:${index} ${video.maxrate} -bufsize:v:${index} ${video.bufsize} -b:a:${index} ${audio.bitrate} `;
		});

		command += `-var_stream_map "${var_stream_map}" -master_pl_name "master.m3u8" -f hls -hls_time 10 -hls_playlist_type vod -hls_list_size 0 -hls_segment_filename "${outputDirPath}/v%v/segment%d.ts" "${outputDirPath}/v%v/index.m3u8" `;
		// Thực thi lệnh ffmpeg
		const { stdout, stderr } = await execPromise(command);
		await fullresTiktokupload(listPathM3U8);
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
async function processAllVideos(inputDir, outputDir) {
	try {
		// Lấy danh sách tất cả các file video trong thư mục input
		const videoFiles = fs.readdirSync(inputDir).filter((file) => {
			const ext = path.extname(file).toLowerCase();
			return [".mp4", ".mkv", ".avi", ".mov"].includes(ext);
		});

		// Lặp qua từng file video và xử lý
		for (const videoFile of videoFiles) {
			const inputFile = path.join(inputDir, videoFile);

			await runFFmpegCommand(inputFile, outputDir);
		}

		console.log("All videos processed successfully.");
	} catch (error) {
		console.error("Error processing videos:", error);
	}
}
module.exports = { processAllVideos };
