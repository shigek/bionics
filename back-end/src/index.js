"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const translate_1 = require("./service/translate");
const query_1 = require("./service/query");
const app = (0, express_1.default)();
const port = 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', async (req, res) => {
    res.status(200).send("<h4>Welcome to Biotec lab.</h4>");
});
app.post('/translate', async (req, res) => {
    const body = (req.body);
    const nucleotideSequence = Array.from(body.data.replaceAll("\n", ""));
    const biospecies = body.biospecies;
    let sequence = "";
    try {
        const response = await (0, translate_1.translate)(Array.from(nucleotideSequence));
        sequence = response.start + response.sequence.join("") + response.end;
        const code = 0;
        res.status(200).send({ code, sequence, biospecies });
    }
    catch (err) {
        const code = -1;
        const message = err.toString();
        console.log(err.toString());
        res.status(500).send({ code, message, sequence, biospecies });
    }
});
app.get('/translate/biospecies', async (req, res) => {
    try {
        const biospecies = await (0, query_1.queryBiospecies)();
        const code = 0;
        console.log(biospecies);
        res.status(200).send({ code, biospecies });
    }
    catch (err) {
        const code = -1;
        const message = err.toString();
        console.log(err.toString());
        res.status(500).send({ code, message });
    }
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
