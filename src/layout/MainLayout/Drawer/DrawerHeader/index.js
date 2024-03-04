import PropTypes from 'prop-types';

// material-ui
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import { Stack, Chip } from '@mui/material';
import { Grid, Typography } from '@mui/material';

// project import
import DrawerHeaderStyled from './DrawerHeaderStyled';
import Logo from 'components/Logo';

// ==============================|| DRAWER HEADER ||============================== //

const theme = createTheme();

theme.typography.instyle = {
    fontSize: '0.8rem',
    color: '#cbeaf9',
    textAlign: 'center',
    display: 'block'
};

theme.typography.h6 = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
};

const DrawerHeader = ({ open }) => {
    return (
        <DrawerHeaderStyled theme={theme} open={open}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Logo />
            </Stack>
        </DrawerHeaderStyled>
        // <table style={{ backgroundColor: '#1890ff' }}>
        //     <tr>
        //         <td>
        //             <ThemeProvider theme={theme}>
        //                 <Typography variant="h6">화성시 도로관리시스템</Typography>
        //             </ThemeProvider>
        //         </td>
        //     </tr>
        //     <tr>
        //         <td>
        //             <ThemeProvider theme={theme}>
        //                 <Typography variant="instyle">"도로교통국 도록관리과"님 반갑습니다</Typography>
        //             </ThemeProvider>
        //         </td>
        //     </tr>
        // </table>
    );
};

DrawerHeader.propTypes = {
    open: PropTypes.bool
};

export default DrawerHeader;
