import React, { useState, useEffect } from 'react';
// project import
import NavCard from './NavCard';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import ReportFor from './Fillpages/ReportFor';
import RoadinFor from './Fillpages/RoadinFor';
// ==============================|| DRAWER CONTENT ||============================== //

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 1 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`
    };
}

const useStyles = makeStyles({
    tabLabel: {
        fontFamily: 'YourFont',
        fontSize: '16px',
        fontWeight: 'bold'
    },
    tabs: {
        '& .MuiTabs-indicator': {
            backgroundColor: '#fff',
            height: 0
        },
        '& .MuiTab-root.Mui-selected': {
            backgroundColor: '#fff',
            color: '#1890ff'
        }
    }
});

function DrawerContent() {
    const theme = useTheme();
    const classes = useStyles();

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <SimpleBar
            sx={{
                '& .simplebar-content': {
                    display: 'flex',
                    flexDirection: 'column'
                }
            }}
        >
            <AppBar position="static" elevation={0}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    className={classes.tabs}
                >
                    <Tab label="보고서 작성" className={classes.tabLabel} {...a11yProps(0)} />
                    <Tab label="구간정보" className={classes.tabLabel} {...a11yProps(1)} />
                    <Tab label="포인트 클라우드" className={classes.tabLabel} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <ReportFor />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <RoadinFor />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                Item Three
            </TabPanel>
            {/* <Navigation /> */}
        </SimpleBar>
    );
}

export default DrawerContent;
