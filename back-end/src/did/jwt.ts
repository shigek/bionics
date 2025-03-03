import * as jose from 'jose';
import * as file from "../utils/file";

// Load your private key
const pem = file.readFile('./.certs/key/did-key.private.pem');
const privateKey = await jose.importPKCS8(pem, "ES256");

const jwk = JSON.parse(file.readFile('./.certs/key/did-key-jwk.json'));
const publicJWK = await jose.importJWK(jwk, "ES256");

// Create the payload
const payload = {
    sub: '1234567890',
    name: 'John Doe',
    admin: true
};

// Sign the JWT
async function signToken() {
    const jwt = await new jose.SignJWT(payload)
        .setProtectedHeader({ alg: 'ES256' })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(privateKey);

    return jwt;
}

async function verify(token: string) {
    const result = await jose.jwtVerify(token, publicJWK);
    console.log(result);
}

const token = await signToken();
console.log(token);
await verify(token);