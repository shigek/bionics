import axios from "axios";

export const translate = async (data: string, biospecies?: string) => {
    const res = await axios.post(`http://localhost:8000/translate`,
        { data, biospecies },
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((response) => response)
        .catch((err) => err);

    if (res.status !== 200) {
        return res.response.data.message.toString();
    } else {
        return res.data.sequence;
    }
}

export type BiospeciesList =
    { code: number, message: string, biospecies: string[] };
export const getBiospeciesList = async (): Promise<BiospeciesList> => {
    const res = await axios.get(`http://localhost:8000/translate/biospecies`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        })
        .then((response) => response)
        .catch((err) => err);

    if (res.status !== 200) {
        return { code: res.data.code, message: res.response.data.message.toString(), biospecies: [] };
    } else {
        return { code: res.data.code, message: "", biospecies: res.data.biospecies };
    }
}

