'use client'

import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardOutlinedIcon from '@mui/icons-material/KeyboardOutlined';
import Image from 'next/image'
import FileSelection from './FileSelection';
import { useRouter } from 'next/navigation'

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);
const manualCard = (
  <React.Fragment>
    <CardContent>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Image
          src="/images/cards/CopyAndPaste.png"
          width={100}
          height={100}
          priority={true}
          alt="Copy & Paste"
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
  </React.Fragment>
);

export const StartGeneLeft = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push(`/builder?no=1`);
  }
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        {manualCard}
        <CardActions>
          <IconButton onClick={handleClick} sx={{ fontSize: 14 }} size="small" color="primary">
            <KeyboardOutlinedIcon />手動で入力する
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  );
}
export const StartGeneRight = () => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <FileSelection />
      </Card>
    </Box>
  );
}
