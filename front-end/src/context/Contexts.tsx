import { createContext } from "react"

export type TabsControlModel = {
    current: number
    panel?: TabPanelModel
}
export type TabPanelModel = {
    no: number
    contents: Contents
}

export type Contents = {
    nucleotideSequence: string | undefined
    aminoAcidSequence: string | undefined
}

export const TabPanelContents = createContext<TabPanelModel>({ no: 0, contents: { nucleotideSequence: "", aminoAcidSequence: "" } });
export const TabsControl = createContext<TabsControlModel>({ current: 0 });
export const BiospeciesName = createContext<string>("");