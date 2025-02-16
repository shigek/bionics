import crypto from 'crypto';
import elliptic from 'elliptic';
import base58 from 'bs58';
import encode from 'base64url';

const createId = () => {
    const key = crypto.randomBytes(32).toString("hex");
    const ec = new elliptic.ec('p256');
    const prv = ec.keyFromPrivate(key, 'hex');
    const pub = prv.getPublic();
    const ecjwk = {
        kty: "EC",
        crv: "P-256",
        x: encode(pub.getX().toArrayLike(Buffer, 'be', 32)),
        y: encode(pub.getY().toArrayLike(Buffer, 'be', 32)),
    };
    console.log("--------generate key for did -------------------")
    console.log(` x (b64): ${ecjwk.x}`);
    console.log(` y (b64): ${ecjwk.y}`);
    console.log("-----------------------------\n")
    let yhex = pub.getY().toBuffer().toString('hex')
    const parity_flag = ((parseInt(yhex.slice(-1), 16) % 2) == 1) ? "03" : "02";
    let tmp = "8024" + parity_flag + pub.getX().toBuffer().toString('hex');
    let _did = "did:key:z" + base58.encode(Buffer.from(tmp, 'hex'));
    return _did;
}
let did = createId();
console.log("did -> " + did)

