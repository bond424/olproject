import React, { useState, useEffect } from 'react';
import 'ol/ol.css'; //스타일
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'; //지도타일
import XYZ from 'ol/source/XYZ.js';
import { Grid, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { chageMap } from 'store/reducers/menu';
//아이콘들
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';

const MapSwitch = (props) => {
    const dispatch = useDispatch();
    const { map } = props;
    const dmap = map;
    console.log(dmap);

    const dlayers = dmap.getAllLayers();

    // 특정 레이어 숨기기
    const hideLayer = (layer) => {
        layer.setVisible(false);
    };

    // 특정 레이어 보이기
    const showLayer = (layer) => {
        layer.setVisible(true);
    };

    const setl = 'https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=N6cizo2S18gj0lhV1Lcv';
    const setSlayer = new TileLayer({
        source: new XYZ({
            attributions: '',
            url: setl
        })
    });
    // 버튼 클릭 핸들러 함수 정의
    const handleStyleChange = (str) => {
        dlayers.forEach((layer) => {
            if (str === 'vectord') {
                // 선택된 레이어는 항상 보이도록 설정
                showLayer(layer);
            }
            if (layer.values_.name === str) {
                if (!layer.values_.visible) {
                    dlayers.forEach((l) => hideLayer(l));
                    showLayer(layer);
                }
            } else {
                hideLayer(layer);
            }
        });
    };

    return (
        <div
            className="row"
            style={{
                position: 'absolute',
                zIndex: '1000',
                right: '20px',
                top: '20px'
            }}
        >
            <div className="col-auto">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: '#ffffff',
                        borderRadius: '5px',
                        border: '1px solid #00000020',
                        width: '50px'
                    }}
                >
                    <Button
                        onClick={() => handleStyleChange('mainlayer')}
                        component="label"
                        sx={{
                            mr: 0.75,
                            display: 'flex',
                            flexDirection: 'column',
                            justify_content: 'center',
                            text_align: 'center',
                            '& .MuiButton-startIcon': {
                                marginRight: '0px',
                                marginLeft: '0px'
                            },
                            borderRadius: 0,
                            backgroundColor: 'transparent',
                            marginRight: '0px',
                            borderbottom: '1',
                            borderBottomColor: '#00000020',
                            borderBottomStyle: 'solid',
                            borderBottomWidth: '1px',
                            color: '#434347',
                            fontSize: '75%',
                            height: '48px',
                            width: '48px',
                            padding: '0px',
                            minWidth: '48px',
                            fontFamily: 'NotoSansKR',
                            fontWeight: '800',
                            ':hover': {
                                backgroundColor: 'transparent',
                                color: '#6995D5',
                                '& .MuiSvgIcon-root': {
                                    color: '#6995D5'
                                }
                            }
                        }}
                        variant="contained"
                        startIcon={
                            <CameraAltOutlinedIcon
                                sx={{
                                    marginBottom: '0px',
                                    marginTop: '6px',
                                    width: '24px',
                                    height: '24px',
                                    color: '#72737B',
                                    transition: 'color 0.2s'
                                }}
                            />
                        }
                    >
                        원본
                    </Button>
                    <Button
                        onClick={() => handleStyleChange('setSlayer')}
                        component="label"
                        sx={{
                            mr: 0.75,
                            display: 'flex',
                            flexDirection: 'column',
                            '& .MuiButton-startIcon': {
                                marginRight: '0px',
                                marginLeft: '0px'
                            },
                            backgroundColor: 'transparent',
                            marginRight: '0px',
                            borderRadius: 0,
                            backgroundColor: 'transparent',
                            marginRight: '0px',
                            color: '#434347',
                            fontSize: '75%',
                            height: '48px',
                            width: '48px',
                            padding: '0px',
                            minWidth: '48px',
                            fontFamily: 'NotoSansKR',
                            fontWeight: '800',
                            ':hover': {
                                backgroundColor: 'transparent',
                                color: '#6995D5',
                                '& .MuiSvgIcon-root': {
                                    color: '#6995D5'
                                }
                            }
                        }}
                        variant="contained"
                        startIcon={
                            <TrackChangesIcon
                                sx={{
                                    marginBottom: '0px',
                                    marginTop: '6px',
                                    width: '24px',
                                    height: '24px',
                                    color: '#72737B',
                                    transition: 'color 0.2s'
                                }}
                            />
                        }
                    >
                        {/* 임의의 아이콘으로 바꾸기 */}
                        위성
                    </Button>
                </Box>
            </div>
        </div>
    );
};
export default MapSwitch;
