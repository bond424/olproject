import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Vector as VectorLayer } from 'ol/layer';
import { Box, Button } from '@mui/material';
import { Draw, Modify } from 'ol/interaction.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style.js';
import { Select, Translate } from 'ol/interaction.js';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import LayersIcon from '@mui/icons-material/Layers';

import StyleFunction from './StyleFunction';
import { getTipPoint } from './context/letpoint';

const Mapdrawer = (props) => {
    const dispatch = useDispatch();
    // const { vectordLayer } = useSelector((state) => state.menu);
    const { drawFeature } = useSelector((state) => state.menu);
    const { map } = props;

    const typeSelect = document.getElementById('type');
    const showSegments = document.getElementById('segments');
    //const clearPrevious = document.getElementById('clear');

    const modifyStyle = new Style({
        image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
                color: 'rgba(0, 0, 0, 0.7)'
            }),
            fill: new Fill({
                color: 'rgba(0, 0, 0, 0.4)'
            })
        }),
        text: new Text({
            text: 'Drag to modify',
            font: '12px Calibri,sans-serif',
            fill: new Fill({
                color: 'rgba(255, 255, 255, 1)'
            }),
            backgroundFill: new Fill({
                color: 'rgba(0, 0, 0, 0.7)'
            }),
            padding: [2, 2, 2, 2],
            textAlign: 'left',
            offsetX: 15
        })
    });

    const source = new VectorSource();

    const modify = new Modify({ source: source, style: modifyStyle });

    const vector = new VectorLayer({
        source: source,
        style: function (feature) {
            return StyleFunction(feature);
            // return StyleFunction(feature, showSegments.checked);
        }
    });

    map.addLayer(vector);
    map.addInteraction(modify);

    const select = new Select();

    const translate = new Translate({
        features: select.getFeatures()
    });

    let draw;

    function addInteraction(typevalue) {
        map.removeInteraction(translate);
        map.removeInteraction(select);
        if (draw !== null) {
            map.removeInteraction(draw);
        }
        if (typevalue !== 'None') {
            const drawType = typevalue;
            const activeTip = 'Click to continue drawing the ' + (drawType === 'Polygon' ? 'polygon' : 'line');
            const idleTip = 'Click to start measuring';
            let tip = idleTip;

            draw = new Draw({
                source: source,
                type: drawType,
                style: function (feature) {
                    return StyleFunction(feature, drawType, tip, modify);
                }
            });
            draw.on('drawstart', function () {
                // if (clearPrevious.checked) {
                //     source.clear();
                // }
                modify.setActive(false);
                tip = activeTip;
            });
            draw.on('drawend', function () {
                modifyStyle.setGeometry(getTipPoint);
                modify.setActive(true);
                map.once('pointermove', function () {
                    modifyStyle.setGeometry();
                });
                tip = idleTip;
            });
            modify.setActive(true);
            map.addInteraction(draw);
            draw.getOverlay().changed();
        }
    }

    // typeSelect.onchange = function () {
    //     map.removeInteraction(draw);
    //     addInteraction();
    // };

    // showSegments.onchange = function () {
    //     vector.changed();
    //     draw.getOverlay().changed();
    // };

    function addSelect() {
        addInteraction('None');
        map.addInteraction(select);
        map.addInteraction(translate);
    }

    return (
        <div className="row" style={{ position: 'fixed', zIndex: '1100', padding: '10px' }}>
            <div className="col-auto">
                <Box sx={{ display: 'flex' }}>
                    <Button
                        onClick={() => addvctLayer()}
                        component="label"
                        sx={{ mr: 0.75 }}
                        variant="contained"
                        color="error"
                        startIcon={<LayersIcon />}
                    >
                        레이어 생성
                    </Button>
                    <Button
                        onClick={() => addInteraction('Point')}
                        component="label"
                        sx={{ mr: 0.75 }}
                        variant="contained"
                        startIcon={<RadioButtonCheckedIcon />}
                    >
                        포인트
                    </Button>
                    <Button
                        onClick={() => addInteraction('LineString')}
                        component="label"
                        sx={{ mr: 0.75 }}
                        variant="contained"
                        startIcon={<ModeEditOutlineIcon />}
                    >
                        줄
                    </Button>
                    <Button
                        onClick={() => addInteraction('Polygon')}
                        component="label"
                        sx={{ mr: 0.75 }}
                        variant="contained"
                        startIcon={<CropSquareIcon />}
                    >
                        폴리곤
                    </Button>
                    <Button
                        onClick={() => addInteraction('Circle')}
                        component="label"
                        sx={{ mr: 0.75 }}
                        variant="contained"
                        startIcon={<CircleOutlinedIcon />}
                    >
                        원형
                    </Button>
                    <Button
                        onClick={() => addSelect()}
                        component="label"
                        sx={{ mr: 0.75 }}
                        variant="contained"
                        startIcon={<FilterNoneIcon />}
                    >
                        객체 옮기기
                    </Button>
                    <Button
                        onClick={() => addInteraction('None')}
                        component="label"
                        sx={{ mr: 0.75 }}
                        variant="contained"
                        startIcon={<FilterNoneIcon />}
                    >
                        마우스
                    </Button>
                </Box>
            </div>
        </div>
    );
};
export default Mapdrawer;
