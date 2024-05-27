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
import { BorderBottom } from '../../../../../node_modules/@mui/icons-material/index';
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
        fontFamily: 'NotoSansKr',
        fontSize: '18px',
        fontWeight: 'bold'
    },
    tabs: {
        '& .MuiTabs-indicator': {
            backgroundColor: '#fff',
            color: '#18181C',
            height: 0,
            opacity: '1 !important'
        },
        '& .MuiTab-root': {
            backgroundColor: '#fff',
            color: '#18181C',
            opacity: '1 !important'
        },
        '& .MuiTab-root.Mui-selected': {
            backgroundColor: '#fff',
            color: '#6995D5',
            opacity: '1 !important'
        },
        '& .MuiTabs-indicator': {
            backgroundColor: '#6995D5', // 선택된 탭 밑줄 색상
            opacity: '1 !important'
        },
        '&:not(.Mui-selected)': {
            backgroundColor: '#fff'
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
                    <Tab label="객체 목록" className={classes.tabLabel} {...a11yProps(1)} />
                    <Tab label="농경지 가져오기" className={classes.tabLabel} {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <ReportFor />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <RoadinFor />
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                *
            </TabPanel>
            {/* <Navigation /> */}
        </SimpleBar>
    );
}

export default DrawerContent;
