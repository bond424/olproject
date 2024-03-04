import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Toolbar, useMediaQuery } from '@mui/material';

// project import
import Drawer from './Drawer';
import RightDrawer from './RightDrawer';
import Header from './Header';
import navigation from 'menu-items';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

// types
import { openDrawer, openRight } from 'store/reducers/menu';

// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const theme = useTheme();
    const matchDownLG = useMediaQuery(theme.breakpoints.down('xl'));
    const dispatch = useDispatch();

    const { drawerOpen } = useSelector((state) => state.menu);
    const { rightMenuOpen } = useSelector((state) => state.menu);

    // drawer toggler
    const [rightopen, setrightOpen] = useState(drawerOpen);
    const handleRightToggle = () => {
        setrightOpen(!rightopen);
        dispatch(openRight({ rightMenuOpen: !rightopen }));
    };

    const [open, setOpen] = useState(drawerOpen);
    const handleDrawerToggle = () => {
        setOpen(!open);
        dispatch(openDrawer({ drawerOpen: !open }));
    };

    // set media wise responsive drawer
    useEffect(() => {
        setrightOpen(!matchDownLG);
        setOpen(!matchDownLG);
        dispatch(openDrawer({ drawerOpen: !matchDownLG }));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matchDownLG]);

    useEffect(() => {
        if (open !== drawerOpen) setOpen(drawerOpen);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [drawerOpen]);

    useEffect(() => {
        if (rightopen !== rightMenuOpen) setrightOpen(rightMenuOpen);
    }, [rightMenuOpen]);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header open={open} rightopen={rightopen} handleDrawerToggle={handleDrawerToggle} handleRightToggle={handleRightToggle} />
            <Drawer open={open} handleDrawerToggle={handleDrawerToggle} />
            <Box component="main" sx={{ width: '100%', flexGrow: 1 }}>
                <Toolbar />
                <Breadcrumbs navigation={navigation} title titleBottom card={false} divider={false} />
                <Outlet />
            </Box>
            <RightDrawer rightopen={rightopen} handleRightToggle={handleRightToggle} />
        </Box>
    );
};

export default MainLayout;
