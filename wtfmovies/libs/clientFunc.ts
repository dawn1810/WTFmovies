'use-client';
const bufferFromPEM = (pem: string) => {
    // Remove the PEM headers and base64 decode the binary data
    const b64Data = pem.replace(/(-----(BEGIN|END) (PUBLIC|PRIVATE) KEY-----|\s)/g, '');
    return Uint8Array.from(atob(b64Data), (c) => c.charCodeAt(0));
};

const bufferToBase64 = (buffer: any) => {
    return btoa(String.fromCharCode(...buffer));
};

// auth
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

// client validate
export const validateEmail = (email: string) => {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !!email.toLowerCase().match(emailRegex);
};

export const validatePassword = (password: string): number => {
    // Check for empty string
    if (password.length === 0) {
        return 3; // Code 3 for empty password
    }

    // Check password length (8 to 49 characters)
    if (password.length < 8) {
        return 1; // Code 1 for less than 8 characters
    } else if (password.length > 50) {
        return 2; // Code 2 for longer than 50 characters
    }

    // Regular expression for password complexity
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\-]+$/;

    // Check for complexity requirements
    if (!regex.test(password)) {
        return 4; // Code 4 for lack of complexity
    }

    // Password is valid (no errors)
    return 0;
};

// set public key
export const fetchPublicKey = async () => {
    try {
        await fetch('/api/auth/getPublicKey', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching public key:', error);
    }
};
