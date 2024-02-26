const fs = require("fs");
const { exec } = require("child_process");
const util = require("util");
const path = require("path");
const { uploadImagetoTiktok } = require("./upload.js");
const execPromise = util.promisify(exec);
function makeM3U8(existingFilePath, newUrls, outputFilePath) {
	try {
		// Read the existing M3U8 file
		const existingContent = fs.readFileSync(existingFilePath, "utf-8");
		const lines = existingContent.split("\n");

		// Split the content into lines

		// Iterate through the lines and replace existing segment URLs with new URLs
		const updatedLines = [];
		for (let index = 0; index < lines.length; index++) {
			const line = lines[index];

			// Check if the line starts with "#EXTINF:" followed by "output_XXX.ts"
			if (
				line.startsWith("#EXTINF:") &&
				lines[index + 1] &&
				lines[index + 1].startsWith("output_")
			) {
				const newUrl = newUrls.shift() || ""; // Use empty string if no new URL is available
				updatedLines.push(`${line},\n${newUrl}`);
				index++; // Skip the next line containing "output_XXX.ts"
			} else {
				updatedLines.push(line);
			}
		}

		// Join the updated lines back into the content

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
async function runInject(tsDirPath, m3u8FilePath) {
	try {
		// Lấy danh sách tất cả các file video trong thư mục input
		const videoFiles = fs.readdirSync(tsDirPath).filter((file) => {
			const ext = path.extname(file).toLowerCase();
			return [".ts"].includes(ext);
		});

		// Lặp qua từng file video và xử lý
		const listPng = [];
		const totalFiles = videoFiles.length;
		let processedFiles = 0;
		for (const videoFile of videoFiles) {
			const inputFile = path.join(tsDirPath, videoFile);
			const resultFile = await injectpng(inputFile);
			listPng.push(await uploadImagetoTiktok(resultFile));
			processedFiles++;
			console.log(listPng);
			const percentageCompleted = (processedFiles / totalFiles) * 100;
			console.log(
				`Đã xử lý: ${percentageCompleted.toFixed(2)}% (${processedFiles}/${totalFiles})`
			);
		}
		makeM3U8(m3u8FilePath, listPng, m3u8FilePath);
		console.log("File xuất ra:", listPng);
	} catch (error) {
		console.error("Lỗi:", error);
	}
}
function generateUUID() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0;
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}
async function runFFmpegCommand(inputFile, outputDir) {
	try {
		const randomOutputSubDir = generateUUID();
		const outputDirPath = path.join(__dirname, outputDir, randomOutputSubDir);
		const tsDirPath = path.join(outputDirPath, "ts");
		const m3u8FilePath = path.join(outputDirPath, "output.m3u8");
		// Tạo thư mục đầu ra
		fs.mkdirSync(outputDirPath);

		// Tạo thư mục ts
		fs.mkdirSync(tsDirPath);

		const ffmpegPath = path.join(__dirname, "ffmpeg/bin/ffmpeg.exe");
		console.log("xx", outputDirPath, tsDirPath, m3u8FilePath, ffmpegPath);
		const command = `${ffmpegPath} -i "${inputFile}" -c:v libx264 -c:a aac -map 0 -f segment -segment_time 10 -segment_list "${m3u8FilePath}" -segment_list_type m3u8 "${path.join(
			tsDirPath,
			"output_%03d.ts"
		)}"`;
		const { stdout, stderr } = await execPromise(command);

		console.log(`Command Output for ${inputFile}:`);
		console.log(stdout);
		console.error(`Command Errors for ${inputFile}:`);
		console.error(stderr);
		await runInject(tsDirPath, m3u8FilePath);

		console.log(`Segments and playlist created for ${inputFile}`);
	} catch (error) {
		console.error(`Error processing ${inputFile}:`, error, error.stderr);
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
