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
import { Margin } from '../../../../../../node_modules/@mui/icons-material/index';
import AuthBackground from 'assets/images/auth/AuthBackground';

function RoadinFor() {
    const { featurestack } = useSelector((state) => state.layerRedycer);

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

    return (
        <Box
            sx={{
                width: '549px',
                height: 1080,
                backgroundColor: '#F3F3F5'
            }}
        >
            <div
                className="boxWarper"
                style={{
                    width: '549px',
                    paddingTop: '10px',
                    paddingBottom: '10px'
                }}
            >
                <FormControl
                    sx={{
                        minWidth: 147,
                        display: 'inline-block',
                        marginLeft: '10px',
                        backgroundColor: '#fff',
                        fontFamily: 'NotoSansKr'
                    }}
                >
                    <Select
                        value={date}
                        onChange={dateChange}
                        displayEmpty
                        inputProps={{
                            'aria-label': 'Without label',
                            style: {
                                padding: 0
                            }
                        }}
                        sx={{
                            borderRadius: '5px',
                            minWidth: 147,
                            height: '32px',
                            '& .MuiSelect-select': {
                                padding: 0,
                                paddingLeft: '10px'
                            },
                            fontFamily: 'NotoSansKr'
                        }}
                    >
                        <MenuItem value="">전체기간</MenuItem>
                        <MenuItem value={'Date1'}>전체기간1</MenuItem>
                        <MenuItem value={'Date2'}>전체기간2</MenuItem>
                        <MenuItem value={'Date3'}>전체기간3</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    sx={{
                        minWidth: 130,
                        display: 'inline-block',
                        marginLeft: '10px',
                        backgroundColor: '#fff',
                        fontFamily: 'NotoSansKr'
                    }}
                >
                    <Select
                        value={type}
                        onChange={typeChange}
                        displayEmpty
                        inputProps={{
                            'aria-label': 'Without label',
                            style: {
                                padding: 0
                            }
                        }}
                        sx={{
                            borderRadius: '5px',
                            minWidth: 130,
                            height: '32px',
                            '& .MuiSelect-select': {
                                padding: 0,
                                paddingLeft: '10px'
                            },
                            fontFamily: 'NotoSansKr'
                        }}
                    >
                        <MenuItem value="">품종</MenuItem>
                        <MenuItem value={'고시히카리'}>고시히카리</MenuItem>
                        <MenuItem value={'샤인머스켓'}>샤인머스켓</MenuItem>
                        <MenuItem value={'폭탄수박'}>폭탄수박</MenuItem>
                    </Select>
                </FormControl>
                <form
                    style={{
                        display: 'inline-block'
                    }}
                    className="test1"
                    noValidate
                    autoComplete="off"
                >
                    <FormControl
                        sx={{
                            width: '230px',
                            marginLeft: '10px',
                            backgroundColor: '#fff',
                            style: {
                                paddingRight: 0
                            }
                        }}
                    >
                        <OutlinedInput
                            placeholder="검색어를 입력해주세요."
                            sx={{
                                paddingLeft: '10px',
                                paddingRight: '0px',
                                fontFamily: 'NotoSansKr'
                            }}
                            inputProps={{
                                style: {
                                    padding: 0,
                                    borderRadius: '5px',
                                    height: '32px'
                                }
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        sx={{
                                            backgroundColor: '#6995D5',
                                            fontFamily: 'NotoSansKr',
                                            fontSize: '14px',
                                            height: '32px',
                                            color: '#fff',
                                            width: '39px',
                                            marginRight: 0,
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                borderRadius: '0 0 5px 5px' // 각 모서리에 개별적으로 borderRadius 설정
                                            }
                                        }}
                                    >
                                        검색
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </form>
            </div>
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    padding: 0
                }}
            >
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
