async function generateKeyPair() {
    // Generate an RSA key pair for encryption and decryption
    const keyPair = await crypto.subtle.generateKey(
        {
            name: 'RSA-OAEP',
            modulusLength: 2048,
            publicExponent: new Uint8Array([1, 0, 1]),
            hash: 'SHA-256',
        },
        true,
        ['encrypt', 'decrypt'],
    );

    // Export the public key to a PEM format to send to the client
    const publicKeyExported = await crypto.subtle.exportKey('spki', keyPair.publicKey);
    const publicKeyPEM = `-----BEGIN PUBLIC KEY-----\n${btoa(
        String.fromCharCode(...new Uint8Array(publicKeyExported)),
    )}\n-----END PUBLIC KEY-----`;

    // Export the private key to store in .env on the server side
    const privateKeyExported = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);
    const privateKeyPEM = `-----BEGIN PRIVATE KEY-----\n${btoa(
        String.fromCharCode(...new Uint8Array(privateKeyExported)),
    )}\n-----END PRIVATE KEY-----`;

    console.log('publicKey = ', publicKeyPEM)
    console.log('privateKey = ', privateKeyPEM)

    return publicKeyPEM;
}

generateKeyPair();