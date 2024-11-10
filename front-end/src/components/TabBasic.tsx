import { Paper, TextField } from '@mui/material';
import { TabPanelContents, TabPanelModel, TabsControl, TabsControlModel } from 'context/Contexts';
import { useContext } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const TabBasic = () => {
    const nucleotideSequence: TabPanelModel = useContext(TabPanelContents)
    const tabControll: TabsControlModel = useContext(TabsControl)
    return (
        <Tabs>
            <TabList>
                <Tab>配列</Tab>
            </TabList>
            {/* <TabPanel style={{ width: "100%", resize: "none" }}>
                {tabControll.current === 0 &&
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
                            value={nucleotideSequence.contents.nucleotideSequence} />
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
                            value={nucleotideSequence.contents.aminoAcidSequence} />
                    </Paper>
                }
            </TabPanel> */}
        </Tabs>
    );
}
export default TabBasic;
