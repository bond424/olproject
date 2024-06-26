import { useState } from 'react';

// material-ui
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Grid,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    MenuItem,
    Stack,
    TextField,
    Typography
} from '@mui/material';

import OlMap from './map/BaseMap';
import BaseUI from './map/BaseMapUI';

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <Grid container>
            <OlMap>
                <BaseUI />
            </OlMap>
        </Grid>
    );
};

export default DashboardDefault;
