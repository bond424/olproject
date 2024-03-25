import React, { useState, useEffect } from 'react';
import 'ol/ol.css'; //스타일
import { Vector as VectorLayer } from 'ol/layer';
import { Grid, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { activeItem, activeDrawf } from 'store/reducers/menu';
import { Fill, Stroke, Style } from 'ol/style.js';
import { Draw, Select, Translate, defaults as defaultInteractions } from 'ol/interaction.js';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FilterNoneIcon from '@mui/icons-material/FilterNone';

const Mapdrawer = (props) => {
    const { drawFeature } = useSelector((state) => state.menu);
    const { map, source } = props;
    const [tySelect, settySelect] = useState(null);
    const vectord = new VectorLayer({
        source: source
    });

    const dmap = map.map;

    dmap.addLayer(vectord);

    let select = null; // ref to currently selected interaction

    const selected = new Style({
        fill: new Fill({
            color: '#eeeeee'
        }),
        stroke: new Stroke({
            color: 'rgba(255, 255, 255, 0.7)',
            width: 2
        })
    });

    function selectStyle(feature) {
        const color = feature.get('COLOR') || '#eeeeee';
        selected.getFill().setColor(color);
        return selected;
    }

    // select interaction working on "singleclick"
    const selectSingleClick = new Select({ style: selectStyle });

    const changeInteraction = function () {
        if (select !== null) {
            dmap.removeInteraction(select);
        }
        select = selectSingleClick;
        if (select !== null) {
            dmap.addInteraction(select);
        }
    };

    changeInteraction();

    const [undoStack, setUndoStack] = useState([]);
    const [draw, setdraw] = useState(null);
    let drawlayer;

    useEffect(() => {
        // Ctrl + Z 키 입력 시
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.key === 'z') {
                undoLastDraw();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [undoStack]);

    function addInteraction(btnid) {
        if (draw !== null) {
            dmap.removeInteraction(draw);
        }
        if (btnid !== 'None') {
            drawlayer = new Draw({
                source: source,
                type: btnid
            });
            drawlayer.on('drawend', saveDrawnFeature);
            dmap.addInteraction(drawlayer);
            setdraw(drawlayer);
        }
        settySelect(btnid);
    }

    function saveDrawnFeature(event) {
        const feature = event.feature;
        const clonedFeature = feature.clone();
        setUndoStack((undoStack) => [...undoStack, clonedFeature]);
    }

    function undoLastDraw() {
        if (undoStack.length > 0) {
            const updatedStack = [...undoStack];
            updatedStack.pop(); // 스택의 마지막 항목 제거
            setUndoStack(updatedStack); // 업데이트된 스택으로 설정
            source.clear(); // 이전 도형들을 모두 지우고
            updatedStack.forEach((feature) => source.addFeature(feature));
        }
    }

    return (
        <div class="row" style={{ position: 'fixed', zIndex: '1100', padding: '10px' }}>
            <div class="col-auto">
                <Box sx={{ display: 'flex' }}>
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
