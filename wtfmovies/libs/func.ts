export const runtime = 'edge';
import { getOptionalRequestContext } from '@cloudflare/next-on-pages';
import Mongodb from 'mongodb-cloudflare';
import { DateMongo, ObjectMongo, ResponseTiktokOK } from './interfaces';
export const { env } = getOptionalRequestContext() ?? {
    env: {
        AUTH_SECRET: 'haha',
        APIKey: 'haha',
        URL_Endpoint: 'haha',
        TIKTOKCOOKIE: 'haha',
        GOOGLE_CLIENT_ID: '',
        GOOGLE_CLIENT_SECRET: '',
        GITHUB_CLIENT_ID: '',
        GITHUB_CLIENT_SECRET: '',
    },
};
export function mongodb(): Mongodb {
    return new Mongodb({
        apiKey: env.APIKey,
        apiUrl: env.URL_Endpoint,
        dataSource: 'WTFmovies',
    });
}

// auth
const bufferFromPEM = (pem: string) => {
    // Remove the PEM headers and base64 decode the binary data
    const b64Data = pem.replace(/(-----(BEGIN|END) (PUBLIC|PRIVATE) KEY-----|\s)/g, '');
    return Uint8Array.from(atob(b64Data), (c) => c.charCodeAt(0));
};

const base64ToBuffer = (b64: string) => {
    return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
};

const bufferToBase64 = (buffer: any) => {
    return btoa(String.fromCharCode(...buffer));
};

export const encryptData = async (publicKeyPEM: string, data: string) => {
    // Import the public key
    const publicKey = await crypto.subtle.importKey(
        'spki',
        bufferFromPEM(publicKeyPEM),
        {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
        },
        true,
        ['encrypt'],
    );

    // Convert the data to an ArrayBuffer and encrypt it
    const encrypted = await crypto.subtle.encrypt(
        {
            name: 'RSA-OAEP',
        },
        publicKey,
        new TextEncoder().encode(data),
    );

    // Convert the encrypted data to a Base64 string to return
    return bufferToBase64(new Uint8Array(encrypted));
};

export const decryptData = async (privateKeyPEM: string, encryptedData: string) => {
    // Import the private key
    const privateKey = await crypto.subtle.importKey(
        'pkcs8',
        bufferFromPEM(privateKeyPEM),
        {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
        },
        true,
        ['decrypt'],
    );

    // Convert the Base64 encoded data to an ArrayBuffer
    const decrypted = await crypto.subtle.decrypt(
        {
            name: 'RSA-OAEP',
        },
        privateKey,
        base64ToBuffer(encryptedData),
    );

    // Convert the decrypted ArrayBuffer back into a string
    return new TextDecoder().decode(new Uint8Array(decrypted));
};

//auth
export const getSHA256Hash = async (input: string): Promise<string> => {
    const textAsBuffer = new TextEncoder().encode(input);
    const hashBuffer = await crypto.subtle.digest('SHA-256', textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hash = hashArray.map((item) => item.toString(16).padStart(2, '0')).join('');
    return hash;
};

// compare password
export const comparePassWord = async (serverPass: string, clientPass: string): Promise<boolean> =>
    serverPass === (await getSHA256Hash(clientPass));

// generate uuidv4
export const generateUUIDv4 = (): string => {
    // Create a placeholder array for UUID format
    const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

    return template.replace(/[xy]/g, (c) => {
        // Generate a random number between 0 and 15
        const r = (Math.random() * 16) | 0;
        // Adjust for 'y' values to conform to RFC 4122 which requires it to be 8, 9, A, or B
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        // Convert the number to its hexadecimal representation
        return v.toString(16);
    });
};

// response function
export function toJSON(data: unknown, status = 200): Response {
    let body = JSON.stringify(data, null, 2);
    let headers = { 'content-type': 'application/json' };
    return new Response(body, { headers, status });
}

export function toError(error: string | unknown, status = 400): Response {
    return toJSON({ error }, status);
}

export function reply(output = { status: 'OK' }): Response {
    if (output != null) return toJSON(output, 200);
    return toError({ error: 'Error with query' }, 500);
}

//mongodb
export function ObjectId(id: string): ObjectMongo {
    return {
        $oid: id,
    };
}

export function MongoDate(data: Date): DateMongo {
    return {
        $date: data.toISOString(),
    };
}

//tiktok upload

// sessionid_ss_ads = 49aec6dd1283b4f8214dd2b1bbee2358
// or
// sid_tt_ads = 49aec6dd1283b4f8214dd2b1bbee2358
// or
// sessionid_ads= 49aec6dd1283b4f8214dd2b1bbee2358

let currentCookie = `csrftoken=9BrXKhM5zk3UXppyxHP2EtgbdLWZJg9W;sessionid_ss_ads=${env.TIKTOKCOOKIE}`;

function updateCookie(currentCookie: string, newCookie: string) {
    const currentCookies = currentCookie ? currentCookie.split(';') : [];
    const newCookies = newCookie.split(';');

    const updatedCookies = currentCookies.map((current) => {
        const currentKey = current.split('=')[0].trim();
        const newCookieValue = newCookies.find((newC) => newC.trim().startsWith(`${currentKey}=`));

        return newCookieValue || current;
    });

    return updatedCookies.join('; ');
}

function getCsrfToken(cookieString: string) {
    const cookies = cookieString.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrftoken') {
            return value;
        }
    }
    return '';
}

export async function uploadImagetoTiktok(file_blob: File) {
    try {
        const formData = new FormData();
        formData.append('Filedata', file_blob);

        const headers = new Headers();

        // Add custom headers
        headers.append('x-csrftoken', getCsrfToken(currentCookie));

        // Add cookie from the previous response
        if (currentCookie) {
            headers.append('Cookie', currentCookie);
        }
        const generateUUID = () => {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                const r = (Math.random() * 16) | 0;
                const v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        };

        const response = await fetch(
            `https://ads.tiktok.com/api/v2/i18n/material/image/upload/?aadvid=${generateUUID()}`,
            {
                method: 'POST',
                body: formData,
                headers: headers,
            },
        );

        if (response.ok) {
            const responseData: ResponseTiktokOK = await response.json();
            // Update currentCookie with the new values
            const responseCookieHeader = response.headers.get('Set-Cookie');
            if (responseCookieHeader) {
                currentCookie = updateCookie(currentCookie, responseCookieHeader);
            }

            if (responseData.msg === 'success' && responseData.data) {
                // console.log("Upload successful:", file_path);
                // fs.unlink(file_path, (err: any) => {
                //     if (err) throw (err);
                // });
                return responseData.data.url;
            }
        } else {
            console.error('Failed to upload:', await response.text());
        }
        console.error('Upload unsuccessful:', await response.text());
        return null;
    } catch (error: any) {
        await uploadImagetoTiktok(file_blob);
        console.error('Error uploading file:', error.message);
        throw error;
    }
}
