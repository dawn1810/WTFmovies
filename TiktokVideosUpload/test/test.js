fetch("https://ads.tiktok.com/passport/web/account/info", {
	headers: {
		accept: "application/json, text/plain, */*",
		"x-csrftoken": "9BrXKhM5zk3UXppyxHP2EtgbdLWZJg9W",
		cookie: "csrftoken=9BrXKhM5zk3UXppyxHP2EtgbdLWZJg9W;  sid_guard_ads=49aec6dd1283b4f8214dd2b1bbee2358%7C1706877746%7C863999%7CMon%2C+12-Feb-2024+12%3A42%3A25+GMT; ",
	},
	body: null,
	method: "GET",
}).then(async function (response) {
	if (response.ok) {
		const responseData = await response.json();

		// Update currentCookie for subsequent requests
		// Update currentCookie with the new values
		const responseCookieHeader = response.headers;
		if (responseCookieHeader) {
			console.log(responseCookieHeader);
		}

		// console.log("Upload successful:", responseData);
	} else {
		console.error("Failed to upload:", await response.text());
	}
});
