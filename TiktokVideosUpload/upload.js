const fs = require("fs");

// sessionid_ss_ads = 49aec6dd1283b4f8214dd2b1bbee2358
// or
// sid_tt_ads = 49aec6dd1283b4f8214dd2b1bbee2358
// or
// sessionid_ads= 49aec6dd1283b4f8214dd2b1bbee2358

let currentCookie =
	"csrftoken=9BrXKhM5zk3UXppyxHP2EtgbdLWZJg9W;sessionid_ss_ads=2284b0aba16b60b8787735d51d594aca";

function updateCookie(currentCookie, newCookie) {
	const currentCookies = currentCookie ? currentCookie.split(";") : [];
	const newCookies = newCookie.split(";");

	const updatedCookies = currentCookies.map((current) => {
		const currentKey = current.split("=")[0].trim();
		const newCookieValue = newCookies.find((newC) => newC.trim().startsWith(`${currentKey}=`));

		return newCookieValue || current;
	});

	return updatedCookies.join("; ");
}

function getCsrfToken(cookieString) {
	const cookies = cookieString.split(";");
	for (const cookie of cookies) {
		const [name, value] = cookie.trim().split("=");
		if (name === "csrftoken") {
			return value;
		}
	}
	return null;
}

async function uploadImagetoTiktok(file_path) {
	try {
		const file_buffer = await fs.promises.readFile(file_path);

		const formData = new FormData();
		const file_blob = new Blob([file_buffer], { type: "image/png" });

		formData.append("Filedata", file_blob);

		const headers = new Headers();

		// Add custom headers
		headers.append("x-csrftoken", getCsrfToken(currentCookie));

		// Add cookie from the previous response
		if (currentCookie) {
			headers.append("Cookie", currentCookie);
		}

		const response = await fetch("https://ads.tiktok.com/api/v2/i18n/material/image/upload/?aadvid=7330641590375137282", {
			method: "POST",
			body: formData,
			headers: headers,
		});

		if (response.ok) {
			const responseData = await response.json();

			// Update currentCookie for subsequent requests
			// Update currentCookie with the new values
			const responseCookieHeader = response.headers.get("Set-Cookie");
			if (responseCookieHeader) {
				currentCookie = updateCookie(currentCookie, responseCookieHeader);
			}

			if (responseData.msg === "success" && responseData.data) {
				console.log("Upload successful:", file_path);
				return responseData.data.url;
			}
		} else {
			console.error("Failed to upload:", await response.text());
		}
		console.log("Upload unsuccessful:", await response.text());
		return null;
	} catch (error) {
		console.error("Error uploading file:", error.message);
		return null;
	}
}

module.exports = { uploadImagetoTiktok };
