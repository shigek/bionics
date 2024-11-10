import { Grid2 } from '@mui/material';
import './App.css';
import Header from 'components/Header';
import DropzoneBasic from 'components/DropzoneBasic';

function App() {
  return (
    <Grid2 container direction="column">
      <Grid2>
        <Header />
      </Grid2>
      <Grid2 container>
        <Grid2 size={{ sm: 1 }} />
        <Grid2 size={{ xs: 1, sm: 10 }}>
          <DropzoneBasic />
        </Grid2>
        <Grid2 size={{ sm: 2 }} />
      </Grid2>
    </Grid2>
  );
}

export default App;
