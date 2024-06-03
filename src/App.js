// project import
import Routes from 'routes';
import ThemeCustomization from 'themes';
import ScrollTop from 'components/ScrollTop';
import Typography from 'themes/overrides/Typography';
import { ThemeProvider } from '../node_modules/@mui/styles/index';
import { createTheme } from '@mui/material';
import './assets/fonts/font.css';
import '../src/assets/fonts/NotoSansKR-Regular.woff';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

const theme = createTheme({
    typography: {
        fontFamily: 'NotoSansKR'
    }
});
// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => (
    <ThemeProvider theme={theme}>
        <ThemeCustomization>
            <ScrollTop>
                <Routes />
            </ScrollTop>
        </ThemeCustomization>
    </ThemeProvider>
);

export default App;
