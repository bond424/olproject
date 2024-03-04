import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

// project import
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import MiniDrawerStyled from './MiniDrawerStyled';
import { rightWidth } from 'config';

// ==============================|| MAIN LAYOUT - DRAWER ||============================== //

const MainDrawer = ({ rightopen, handleRightToggle, window }) => {
    const theme = useTheme();
    const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));

    // responsive drawer container
    const container = window !== undefined ? () => window().document.body : undefined;

    // header content
    const drawerContent = useMemo(() => <DrawerContent />, []);
    const drawerHeader = useMemo(() => <DrawerHeader rightopen={rightopen} />, [rightopen]);

    return (
        <Box component="nav" id="dddddd" sx={{ flexShrink: { md: 0 }, zIndex: 1300 }}>
            {!matchDownMD ? (
                <MiniDrawerStyled variant="permanent" open={rightopen}>
                    {/* {drawerHeader} */}
                    {drawerContent}
                </MiniDrawerStyled>
            ) : (
                <Drawer
                    id="dddd"
                    container={container}
                    variant="temporary"
                    open={rightopen}
                    onClose={handleRightToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', lg: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: rightWidth,
                            borderRight: `1px solid ${theme.palette.divider}`,
                            backgroundImage: 'none',
                            boxShadow: 'inherit'
                        }
                    }}
                >
                    {rightopen && drawerHeader}
                    {rightopen && drawerContent}
                </Drawer>
            )}
        </Box>
    );
};

MainDrawer.propTypes = {
    open: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    window: PropTypes.object
};

export default MainDrawer;
