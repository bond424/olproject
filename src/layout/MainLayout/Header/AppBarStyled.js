// material-ui
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';

// project import
import { drawerWidth, rightWidth } from 'config';

// ==============================|| HEADER - APP BAR STYLED ||============================== //

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open, rightopen }) => {
    const basewidth = 'calc(100%)';
    let adjustedWidth = basewidth;

    if (open) {
        adjustedWidth = `calc(${adjustedWidth} - ${drawerWidth}px)`;
    }

    if (rightopen) {
        adjustedWidth = `calc(${adjustedWidth} - ${rightWidth}px)`;
    }

    return {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        ...(open && {
            marginLeft: drawerWidth,
            width: adjustedWidth,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        }),
        ...(rightopen && {
            marginRight: rightWidth,
            width: adjustedWidth,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        })
    };
});

export default AppBarStyled;
