import { Tab, Tabs, Paper, TextField, Box } from '@mui/material';
import React from 'react';
//import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

interface BuilderPropType {
  no: number
  content: { nucleotideSequence: string, aminoAcidSequence: string }
}
const BuilderContainer: React.FC<BuilderPropType> = (props: BuilderPropType) => {
  if (props.no === -1) {
    return;
  }
  console.log(props);
  const [value, setValue] = React.useState(props.no);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {props.no === 1 ? <Tab label="配列（ファイルから）" {...a11yProps(1)} disabled />
            : <Tab label="配列（ファイルから）" {...a11yProps(1)} />
          }
          {props.no === 0 ? <Tab label="配列（手入力）" {...a11yProps(1)} disabled />
            : <Tab label="配列（手入力）" {...a11yProps(1)} />
          }
          <Tab label="最適化" {...a11yProps(2)} />
          <Tab label="逆変換" {...a11yProps(3)} />
          <Tab label="アライメント" {...a11yProps(4)} />
          <Tab label="制限酵素チェック" {...a11yProps(5)} />
          <Tab label="反転" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Paper sx={{ padding: 1, marginY: 1 }}>
          <label>塩基配列</label>
          <TextField
            sx={{
              width: "100%"
            }}
            slotProps={{
              input: {
                rows: 8,
                multiline: true,
                inputComponent: 'textarea'
              }
            }}
            value={props.content.nucleotideSequence} />
          <label>アミノ酸配列</label>
          <TextField
            sx={{
              width: "100%"
            }}
            slotProps={{
              input: {
                rows: 4,
                multiline: true,
                inputComponent: 'textarea'
              }
            }}
            value={props.content.aminoAcidSequence} />
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Paper sx={{ padding: 1, marginY: 1 }}>
          <label>塩基配列</label>
          <TextField
            sx={{
              width: "100%"
            }}
            slotProps={{
              input: {
                rows: 8,
                multiline: true,
                inputComponent: 'textarea'
              }
            }} />
          <label>アミノ酸配列</label>
          <TextField
            sx={{
              width: "100%"
            }}
            slotProps={{
              input: {
                rows: 4,
                multiline: true,
                inputComponent: 'textarea'
              }
            }} />
        </Paper>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item 3
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Item 4
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        Item 5
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        Item 6
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        Item 7
      </CustomTabPanel>
    </Box>
  );
}
export default BuilderContainer;
