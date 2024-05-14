import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import {
    InputLabel,
    Container,
    MenuItem,
    FormControl,
    Select,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import { styled } from '@mui/material/styles';
import 'dayjs/locale/ko';
import PropTypes from 'prop-types';

function RoadinFor() {
    const [age, setAge] = useState('');
    console.log('2');
    const { featurestack } = useSelector((state) => state.layerRedycer);

    useEffect(() => {
        console.log(featurestack);
    }, [featurestack]);

    return (
        <Box fullWidth sx={{ width: '100%', height: 1080, display: 'flex', pl: 1, pr: 1 }}>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {featurestack.map((feature, index) => (
                    <ListItem key={index}>
                        <ListItemAvatar>
                            <Avatar>
                                {feature.geometryName_ === 'photo' ? (
                                    <BeachAccessIcon />
                                ) : feature.type === 'work' ? (
                                    <WorkIcon />
                                ) : (
                                    <ImageIcon />
                                )}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={'고유ID' + feature.ol_uid} secondary={feature.getGeometry().getType() + '타입'} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default RoadinFor;
