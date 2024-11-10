import styles from "@/app/page.module.css";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
} from "@mui/material";

export default function Customer() {
  return (
    <Container>
      <Paper elevation={3} sx={{ m: 6, p: 5 }}>
        <h1 className={styles.title}>Welcome to Material UI!</h1>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
          />
          <FormControlLabel required control={<Checkbox />} label="Required" />
          <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
        </FormGroup>
        <hr />
        <Button sx={{ m: 1 }} variant="contained" color="primary">
          ボタン
        </Button>
      </Paper>
    </Container>
  );
}