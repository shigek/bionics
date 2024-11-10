export type OptimizeResult = {
    forward: Sequence
    translate: Sequence
    reverse: Sequence
}

export type Sequence = {
    start: string
    sequence: string[]
    end: string
}
export type ExtractResult = {
    start: string
    end: string
    reverseStart: string;
    reverseEnd: string;
    forward: string[];
    reverseForward: string[];
    reverse: string[];
}

export type TranslateRequest = {
    data: string
    biospecies: string
}

export type TranslateResponse = {
    code: number;
    aminoacidSequence: string
    biospecies: string
    message?: string
}
