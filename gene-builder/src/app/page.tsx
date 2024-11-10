import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { StartGeneLeft, StartGeneRight } from '@/components/dashbord/StartGene';

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1, m: 6, p: 5 }}>
      配列のファイルのアップロードまたは手動入力で開始します
      <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 1, sm: 1, md: 12 }}>
        {Array.from(Array(2)).map((_, index) => (
          <Grid key={index} size={{ xs: 1, sm: 2, md: 4 }}>
            {index === 0 && <StartGeneLeft key={index} />}
            {index === 1 && <StartGeneRight key={index} />}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
