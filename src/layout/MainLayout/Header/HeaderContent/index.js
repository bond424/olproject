import { forwardRef, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material-ui
import { Box, IconButton, Link, useMediaQuery } from '@mui/material';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ConstructionIcon from '@mui/icons-material/Construction';

import { useDispatch, useSelector } from 'react-redux';

// project import
import Search from './Search';
import Profile from './Profile';
import Notification from './Notification';
import MobileSection from './MobileSection';
import UploadPopup from './UploadPopup/UploadPopup';

import { activeItem, activeDrawf, activeSwitchf } from 'store/reducers/menu';

// ==============================|| HEADER - CONTENT ||============================== //

const HeaderContent = () => {
    const matchesXs = useMediaQuery((theme) => theme.breakpoints.down('md'));

    const dispatch = useDispatch();
    const menu = useSelector((state) => state.menu);
    const { drawFeature } = useSelector((state) => state.menu);
    // const { openItem } = menu;

    let itemTarget = '_self';

    let listItemProps = { component: forwardRef((props, ref) => <RouterLink ref={ref} {...props} to={'/sharemap'} target={itemTarget} />) };
    let dashItemProps = { component: forwardRef((props, ref) => <RouterLink ref={ref} {...props} to={'/'} target={itemTarget} />) };
    let fileProps = { component: forwardRef((props, ref) => <RouterLink ref={ref} {...props} to={'/uploadmap'} target={itemTarget} />) };
    let reportpopup = { component: forwardRef((props, ref) => <RouterLink ref={ref} {...props} to={'/reportpop'} target={itemTarget} />) };

    const [checked2, setChecked2] = useState(false);

    const activebtn = () => {
        if (drawFeature) {
            dispatch(activeDrawf({ drawFeature: false }));
        } else {
            dispatch(activeDrawf({ drawFeature: true }));
        }
        // setChecked((prevChecked) => !prevChecked);
    };
    const activebtn2 = () => {
        setChecked2((prevChecked) => !prevChecked);
        dispatch(activeSwitchf({ switchFeature: !checked2 }));
    };

    const itemHandler = (id) => {
        dispatch(activeItem({ openItem: [id] }));
        dispatch(activeDrawf({ drawFeature: false }));
    };
    return (
        <>
            {!matchesXs && <Search />}
            {matchesXs && <Box sx={{ width: '100%', ml: 1 }} />}
            <IconButton
                onClick={activebtn2}
                target="_blank"
                disableRipple
                color="secondary"
                title="지도 목록"
                sx={{ color: 'text.primary', bgcolor: 'grey.100', mr: 0.75 }}
            >
                <ConstructionIcon />
            </IconButton>
            <IconButton
                onClick={activebtn}
                target="_blank"
                disableRipple
                color="secondary"
                title="객체 그리기"
                sx={{ color: 'text.primary', bgcolor: 'grey.100', mr: 0.75 }}
            >
                <ConstructionIcon />
            </IconButton>
            <IconButton
                {...dashItemProps}
                onClick={() => itemHandler('sharemap')}
                target="_blank"
                disableRipple
                color="secondary"
                title="Download Free Version"
                sx={{ color: 'text.primary', bgcolor: 'grey.100', mr: 0.75 }}
            >
                <DashboardIcon />
            </IconButton>
            <IconButton
                {...listItemProps}
                onClick={() => itemHandler('sharemap')}
                target="_blank"
                disableRipple
                color="secondary"
                title="Download Free Version"
                sx={{ color: 'text.primary', bgcolor: 'grey.100', mr: 0.75 }}
            >
                <LibraryAddCheckIcon />
            </IconButton>
            {/* <IconButton
                {...fileProps}
                onClick={() => itemHandler('uploadmap')}
                target="_blank"
                disableRipple
                color="secondary"
                title="Download Free Version"
                sx={{ color: 'text.primary', bgcolor: 'grey.100', mr: 0.75 }}
            >
                <FileUploadIcon />
            </IconButton> */}
            {/* <IconButton
                {...reportpopup}
                onClick={() => itemHandler('uploadmap')}
                target="_blank"
                disableRipple
                color="secondary"
                title="Download Free Version"
                sx={{ color: 'text.primary', bgcolor: 'grey.100', mr: 0.75 }}
            >
                <SummarizeIcon />
            </IconButton> */}
            <UploadPopup />

            <Notification />
            {!matchesXs && <Profile />}
            {matchesXs && <MobileSection />}
        </>
    );
};

export default HeaderContent;
