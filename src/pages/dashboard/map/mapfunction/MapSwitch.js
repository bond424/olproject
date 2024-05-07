import React, { useState, useEffect } from 'react';
import 'ol/ol.css'; //스타일
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'; //지도타일
import XYZ from 'ol/source/XYZ.js';
import { Grid, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { chageMap } from 'store/reducers/menu';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

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
        <div class="row" style={{ position: 'fixed', zIndex: '1000', padding: '10px' }}>
            <div class="col-auto">
                <Box>
                    <Button
                        onClick={() => handleStyleChange('mainlayer')}
                        component="label"
                        sx={{ mr: 0.75 }}
                        variant="contained"
                        startIcon={<RadioButtonCheckedIcon />}
                    >
                        원본
                    </Button>
                    <Button
                        onClick={() => handleStyleChange('setSlayer')}
                        component="label"
                        sx={{ mr: 0.75 }}
                        variant="contained"
                        startIcon={<ModeEditOutlineIcon />}
                    >
                        위성
                    </Button>
                </Box>
            </div>
        </div>
    );
};
export default MapSwitch;
