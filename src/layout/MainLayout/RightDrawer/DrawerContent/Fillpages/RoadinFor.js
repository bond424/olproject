import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import {
    InputLabel,
    InputAdornment,
    IconButton,
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
import OutlinedInput from '@mui/material/OutlinedInput';
// import { Margin } from '../../../../../../node_modules/@mui/icons-material/index';
import AuthBackground from 'assets/images/auth/AuthBackground';
import '../static/RoadinFor.css'; //스타일
function RoadinFor() {
    const { featurestack } = useSelector((state) => state.layerRedycer);
    const { vectorLayerList } = useSelector((state) => state.layerRedycer);

    const [date, setDate] = React.useState('');
    const [type, setType] = React.useState('');

    const dateChange = (event) => {
        setDate(event.target.value);
    };
    const typeChange = (event) => {
        setType(event.target.value);
    };
    useEffect(() => {
        console.log(featurestack);
    }, [featurestack]);

    useEffect(() => {
        console.log(vectorLayerList);
    }, []);

    return (
        <Box className="boxBody">
            <Box className="boxWarper">
                <FormControl className="RoadinForForm1">
                    <Select
                        className="RoadinForSelect1"
                        value={date}
                        onChange={dateChange}
                        displayEmpty
                        inputProps={{
                            'aria-label': 'Without label',
                            style: {
                                padding: 0
                            }
                        }}
                    >
                        <MenuItem value="">전체기간</MenuItem>
                        <MenuItem value={'Date1'}>전체기간1</MenuItem>
                        <MenuItem value={'Date2'}>전체기간2</MenuItem>
                        <MenuItem value={'Date3'}>전체기간3</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="RoadinForForm2">
                    <Select
                        className="RoadinForSelect2"
                        value={type}
                        onChange={typeChange}
                        displayEmpty
                        inputProps={{
                            'aria-label': 'Without label',
                            style: {
                                padding: 0
                            }
                        }}
                    >
                        <MenuItem value="">품종</MenuItem>
                        <MenuItem value={'고시히카리'}>고시히카리</MenuItem>
                        <MenuItem value={'샤인머스켓'}>샤인머스켓</MenuItem>
                        <MenuItem value={'폭탄수박'}>폭탄수박</MenuItem>
                    </Select>
                </FormControl>
                <FormControl className="RoadinForForm3">
                    <OutlinedInput
                        className="RoadinForInput1"
                        placeholder="검색어를 입력해주세요."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton className="RoadinForInputButton1" edge="end">
                                    검색
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Box>
            <List className="list1">
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
