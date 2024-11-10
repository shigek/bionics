'use client'
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import * as FileReader from "@/utils/FileReaderExtend";
import { Box, CardActions, IconButton } from "@mui/material";
import UploadFile from "@mui/icons-material/UploadFile";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from "react";
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const fileDropCard = (
  <>
    <CardContent>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src="/images/cards/DragAndDrop.png"
          width={100}
          height={100}
          alt="Copy & Paste"
          priority={true}
        />
      </div>
      <Typography gutterBottom sx={{ mt: 0.5, color: 'text.secondary', fontSize: 14 }}>
        Word of the Day
      </Typography>
      <Typography variant="h5" component="div">
        be{bull}nev{bull}o{bull}lent
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>adjective</Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
  </>
);

const FileSelection = () => {
  const router = useRouter()
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (isDragReject) {
      return;
    }
    const dataFile = acceptedFiles.map((file) => file);
    const data: string = await FileReader.readAsText(dataFile[0]);
    router.push(`/builder?no=0&sequence=${data}`);
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
            <h5>{file.name}は許可された拡張子ではありません</h5>
          </p>
        ))}
      </div>
    </>
  ));

  return (
    <div>
      <div {...getRootProps()}>{/* （3） */}
        <input {...getInputProps()} />{/* （3） */}
        <React.Fragment>
          {fileDropCard}
          <CardActions>
            <IconButton onClick={open} sx={{ fontSize: 14 }} size="small" color="primary"><UploadFile />ファイルをアップロードする</IconButton>
          </CardActions>
        </React.Fragment>
      </div>
      {fileRejectionItems}
    </div >
  );
}
export default FileSelection;