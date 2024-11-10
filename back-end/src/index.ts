// index.ts
import cors from "cors";
import express, { Request, Response } from 'express';
import { TranslateRequest } from './model/model';
import { translate } from './service/translate';
import { queryBiospecies } from "./service/query";

const app = express();
const port: number = 8000;
app.use(cors());
app.use(express.json())
app.get('/', async (req: Request, res: Response) => {
    res.status(200).send("<h4>Welcome to Biotec lab.</h4>");
});

app.post('/translate', async (req: Request, res: Response) => {
    const body: TranslateRequest = (req.body);
    const nucleotideSequence = Array.from(body.data.replaceAll("\n", ""));
    const biospecies = body.biospecies;
    let sequence = "";
    try {
        const response = await translate(Array.from(nucleotideSequence));
        sequence = response.start + response.sequence.join("") + response.end;
        const code = 0;
        res.status(200).send({ code, sequence, biospecies });
    } catch (err: any) {
        const code = -1;
        const message = err.toString();
        console.log(err.toString());
        res.status(500).send({ code, message, sequence, biospecies });
    }

});

app.get('/translate/biospecies', async (req: Request, res: Response) => {
    try {
        const biospecies = await queryBiospecies();
        const code = 0;
        console.log(biospecies);
        res.status(200).send({ code, biospecies });
    } catch (err: any) {
        const code = -1;
        const message = err.toString();
        console.log(err.toString());
        res.status(500).send({ code, message });
    }

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
