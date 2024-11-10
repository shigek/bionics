'use client'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { useSearchParams } from 'next/navigation'
import 'react-tabs/style/react-tabs.css';
import { translate } from '@/utils/translate';
import { useEffect, useRef, useState } from 'react';
import BuilderContainer from '@/components/builder/BuilderContainer';

const Builder = () => {
  const initialized = useRef(false)
  const [content, setContent] = useState({ nucleotideSequence: "", aminoAcidSequence: "" });
  const searchParams = useSearchParams();

  const szNo = searchParams.get("no");
  const iNo = (szNo === null) ? 0: parseInt(szNo);
  const data = searchParams.get("sequence")
  useEffect(() => {
    const initialize = async () => {
      console.log(iNo);
      if (iNo === 0) {
        if (data !== null) {
          const sequence = await translate((data === null) ? '' : data);
          const content = (data?.charAt(0) === 'M') ?
            {
              nucleotideSequence: sequence, aminoAcidSequence: data
            }
            :
            {
              nucleotideSequence: data, aminoAcidSequence: sequence
            };
          setContent(content);
        }
      }
    }
    if (!initialized.current) {
      initialize(); initialized.current = true
    } else {
      initialized.current = true
    };
  }, [iNo, searchParams]);

  return (
    <Box sx={{ flexGrow: 1, mt: 3, p: 5 }}>
      <Grid container size={{ sm: 1 }} >
        <Grid size={{ xs: 6, md: 12 }}>
          <BuilderContainer no={parseInt("" + iNo)} content={content} />
        </Grid>
      </Grid>
    </Box>
  );
}
export default Builder;
