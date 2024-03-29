export const runtime = 'edge';
import { getOptionalRequestContext } from "@cloudflare/next-on-pages";
import Mongodb from 'mongodb-cloudflare';
export const { env } = getOptionalRequestContext() ?? { env: { AUTH_SECRET: 'haha', APIKey: 'haha', URL_Endpoint: 'haha' } };
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
