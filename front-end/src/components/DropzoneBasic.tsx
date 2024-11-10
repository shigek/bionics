import { Box, Paper } from "@mui/material";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import FileReaderExtend from "utils/FileReaderExtend";
import { translate } from "utils/translate";
import TabBasic from "./TabBasic";
import { TabPanelContents, TabPanelModel } from "context/Contexts";
import BiospeciesSelection from "./BiospeciesSelection";

const DropzoneBasic = () => {

    // ブラウザ表示用の paths
    const [previewTextPaths, setPreviewImagePaths] = useState<string[]>();
    const [tabPanel, setTabPanel] = useState<TabPanelModel>();
    // カスタムダイアログ表示、非表示管理
    const [biospeciesSelectionOpen, setBiospeciesSelectionOpen] = useState(false);

    // ダイアログ表示ボタンクリック処理
    const buttonClickHome = () => {
        setBiospeciesSelectionOpen(true);
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (isDragReject) {
            return;
        }
        const dataFile = acceptedFiles.map((file) => file);
        const dataUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
        setPreviewImagePaths(dataUrls);
        const reader = new FileReaderExtend();
        const data = await reader.readAsText(dataFile[0]) as string;
        let sequence = await translate(data);
        if (data.charAt(0) === 'M') {
            setTabPanel({ no: 0, contents: { nucleotideSequence: sequence, aminoAcidSequence: data } });
            buttonClickHome();
        } else {
            setTabPanel({ no: 0, contents: { nucleotideSequence: data, aminoAcidSequence: sequence } });
        }
    }, []);

    const { fileRejections, isDragReject, open, getRootProps, getInputProps } = useDropzone({
        accept: { "text/*": [] },
        noClick: true,
        onDrop,
    });

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <>
            <div>
                {errors.map((e) => (
                    <p key={e.code}>
                        {file.name}は許可された拡張子ではありません
                    </p>
                ))}
            </div>
        </>
    ));

    return (
        <div>
            <div {...getRootProps()}>{/* （3） */}
                <input {...getInputProps()} />{/* （3） */}
                <Paper sx={{ padding: 1, marginY: 1 }}>
                    <Box component="section" sx={{ p: 0 }}>
                        ファイルをここにドラッグ&ドロップするか、
                        クリックしてファイルを選択してください
                    </Box>
                </Paper>
            </div>
            {previewTextPaths &&
                <TabPanelContents.Provider
                    value={{ no: 0, contents: { nucleotideSequence: tabPanel?.contents.nucleotideSequence, aminoAcidSequence: tabPanel?.contents.aminoAcidSequence } }} >
                    <TabBasic />
                </TabPanelContents.Provider>
            }
            {fileRejectionItems}
            <BiospeciesSelection
                isOpen={biospeciesSelectionOpen}
                onConfirm={() => {
                    setBiospeciesSelectionOpen(false);
                    console.log("okが押されました");
                }}
                onCancel={() => {
                    setBiospeciesSelectionOpen(false);
                    console.log("キャンセルが押されました");
                }}
            />
        </div >
    );
}
export default DropzoneBasic;