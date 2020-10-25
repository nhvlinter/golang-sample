import React, { FC, ReactNode, ReactElement } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores';

import { BasicLayout } from '../../layouts/BasicLayout';
import { Tabs, Tab, Typography, Box } from '@material-ui/core';
import styles from "./DocumentaryPage.module.scss";
interface TabPanelProps {
  children?: React.ReactNode;
  index?: any;
  value?: any;
}
const TabPanel: FC<{props: TabPanelProps}> = observer((props)=>{
    const { children, value, index, ...other } = props;
    return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
})
export const DocumentaryPage: FC<{}> = observer(({}) => {
    //const {currentUser} = useStore();
    const {sDocumentary} = useStore();
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        sDocumentary.changeTab(newValue);
    };
    return (<BasicLayout>
        <Tabs value={sDocumentary.activeTab} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Công văn đi" />
            <Tab label="Công văn đến" />
          </Tabs>
        <TabPanel value={sDocumentary.activeTab} index={0}>
            Item One
        </TabPanel>
        <TabPanel value={sDocumentary.activeTab} index={1}>
            Item Two
        </TabPanel>
        <TabPanel value={sDocumentary.activeTab} index={2}>
            Item Three
        </TabPanel>
    </BasicLayout>);
});