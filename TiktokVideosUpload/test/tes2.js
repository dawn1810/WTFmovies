fetch(
	"https://ads.tiktok.com/passport/sso/login/callback/?aid=1583&next=https%3A%2F%2Fads.tiktok.com%2Fpassport%2Fweb%2Faccount%2Finfo%2F%3Faid%3D1583&ticket=fe679e4757ca0d475fb780ba096bc37c&msToken=g007meJyY0qQsr_xrTFPQxqCwmJYUzsjRJGnCx2wDe-DgmmSjc1Y0e8Sb_mkS92AUZ2K-VoV5vRiZ8GM0p6TXFjDMfRAiNweLE96565lmYAMA-EyEjza4IKalkp9wt-WX6cngg==&X-Bogus=DFSzswVYSjbANG7HtEETkmsZrJiG&_signature=_02B4Z6wo00001tnh7qAAAIDCJo1wMHwT5.LZ4eoAANPRc1",
	{
		headers: {
			accept: "*/*",
			"accept-language": "en-US,en;q=0.9,vi;q=0.8",
			"content-type": "application/x-www-form-urlencoded",
			"sec-ch-ua": '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": '"Windows"',
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"x-requested-with": "XMLHttpRequest",
		},
		referrer:
			"https://ads.tiktok.com/i18n/login/?redirect=https%3A%2F%2Fads.tiktok.com%2Fi18n%2Fmaterial%2Fimage%3Faadvid%3D7330641590375137282",
		referrerPolicy: "origin-when-cross-origin",
		body: null,
		method: "GET",
		mode: "cors",
		credentials: "include",
	}
).then(async function (response) {
	if (response.ok) {
		const responseData = await response.json();

		// Update currentCookie for subsequent requests
		// Update currentCookie with the new values
		console.log(response);
		// const responseCookieHeader = response.headers;
		// if (responseCookieHeader) {
		// 	console.log(responseCookieHeader);
		// }

		// console.log("Upload successful:", responseData);
	} else {
		console.error("Failed to upload:", await response.text());
	}
});
