import { rawKeyInHexfromUncompressed, compressedKeyInHexfromRaw, encodeDIDfromHexString, encodeDIDfromBytes } from 'did-key-creator'

import { fromString } from 'uint8arrays/from-string'
import elliptic from 'elliptic'
import { KEYUTIL } from 'jsrsasign';
import encode from 'base64url';

import * as file from "../utils/file";

const ecurve = new elliptic.ec('p256')
const key = ecurve.genKeyPair();
const pubPoint = key.getPublic('hex');
const multicodecName = 'p256-pub';

const rawKey = rawKeyInHexfromUncompressed(pubPoint);
const compressedKey = compressedKeyInHexfromRaw(rawKey);

const publicKey2 = fromString(compressedKey, 'base16');
console.log(encodeDIDfromHexString(multicodecName, compressedKey));
const did = encodeDIDfromBytes(multicodecName, publicKey2);
file.writeJSON("./.certs/key/did-key.json", [{did}]);


const privateKeyHex = key.getPrivate('hex');
const privateKey = KEYUTIL.getKey({ d: privateKeyHex, curve: 'P-256' });
const privateKeyPEM = KEYUTIL.getPEM(privateKey, 'PKCS8PRV');
console.log('Private Key PEM:\n', privateKeyPEM);
file.writeString("./.certs/key/did-key.private.pem", privateKeyPEM);

const publicKey = key.getPublic();
const jwk = {
    kty: 'EC',
    crv: 'P-256',
    x: encode(publicKey.getX().toArrayLike(Buffer, 'be', 32)),
    y: encode(publicKey.getY().toArrayLike(Buffer, 'be', 32)),
};
file.writeJSON("./.certs/key/did-key-jwk.json", [jwk]);
console.log(jwk);