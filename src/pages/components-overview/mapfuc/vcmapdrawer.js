import React, { useState, useEffect } from 'react';
import 'ol/ol.css'; //스타일
import { Vector as VectorLayer } from 'ol/layer';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Fill, Stroke, Style, Circle as CircleStyle } from 'ol/style.js';
import { Draw, Select, Translate, defaults as defaultInteractions } from 'ol/interaction.js';
import { Vector as VectorSource } from 'ol/source.js';
import Overlay from 'ol/Overlay.js';
import { LineString, Polygon } from 'ol/geom.js';
import { unByKey } from 'ol/Observable.js';
import { getArea, getLength } from 'ol/sphere.js';

import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import LayersIcon from '@mui/icons-material/Layers';

const Mapdrawer = (props) => {
    const dispatch = useDispatch();
    const { vectordLayer } = useSelector((state) => state.menu);
    const { drawFeature } = useSelector((state) => state.menu);
    const { map, source } = props;
    const dmap = map.map;
    const [vectordLayerInfo, setVectordLayerInfo] = useState(null);
    const [layerStack, setlayerStack] = useState([]);
    let measureTooltipElement;
    let measureTooltip;
    let helpTooltip;
    let helpTooltipElement;
    let sketch;

    // 레이어 생성
    function addvctLayer() {
        const newVectordLayerInfo = new VectorLayer({
            source: source,
            name: 'uploadvct'
        });
        dmap.addLayer(newVectordLayerInfo);
        setlayerStack((Stack) => [...Stack, newVectordLayerInfo]);
        setVectordLayerInfo(newVectordLayerInfo);
    }

    // 레이어 삭제
    function removevctLayer(delayer) {
        //updatedStack.forEach((feature) => source.addFeature(feature));
        delayer.forEach((x) => dmap.removeLayer(x));
        setVectordLayerInfo(null);
    }

    useEffect(() => {
        return () => {
            // 언마운트 될 때 레이어 삭제
            if (layerStack.length > 0) {
                removevctLayer(layerStack);
            }
        };
    }, [layerStack]);

    let select = null;

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

    const formatLength = function (line) {
        const length = getLength(line);
        let output;
        if (length > 100) {
            output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
        } else {
            output = Math.round(length * 100) / 100 + ' ' + 'm';
        }
        return output;
    };

    const formatArea = function (polygon) {
        const area = getArea(polygon);
        let output;
        if (area > 10000) {
            output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
        } else {
            output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
        }
        return output;
    };

    useEffect(() => {
        if (drawFeature) {
            changeInteraction();
        }
    }, [drawFeature]);

    const [undoStack, setUndoStack] = useState([]);
    const [textStack, setTextStack] = useState([]);
    const [draw, setdraw] = useState(null);
    let drawlayer = null;

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
        if (vectordLayerInfo === null) {
            return;
        }
        if (draw !== null) {
            dmap.removeInteraction(draw);
        }
        if (btnid !== 'None') {
            drawlayer = new Draw({
                source: source,
                type: btnid
            });
            dmap.addInteraction(drawlayer);
            //drawlayer.on('drawend', saveDrawnFeature);

            createMeasureTooltip();
            createHelpTooltip();

            let listener;
            drawlayer.on('drawstart', function (evt) {
                sketch = evt.feature;
                let tooltipCoord = evt.coordinate;

                listener = sketch.getGeometry().on('change', function (evt) {
                    const geom = evt.target;
                    let output;
                    if (geom instanceof Polygon) {
                        output = formatArea(geom);
                        tooltipCoord = geom.getInteriorPoint().getCoordinates();
                    } else if (geom instanceof LineString) {
                        output = formatLength(geom);
                        tooltipCoord = geom.getLastCoordinate();
                    }
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            });

            drawlayer.on('drawend', function (evt) {
                saveDrawnFeature(evt);
                setdraw(drawlayer);
                //setTextStack((textStack) => [...textStack, { text: output, tooltip: measureTooltip }]);
                measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
                measureTooltip.setOffset([0, -7]);
                sketch = null;
                measureTooltipElement = null;
                createMeasureTooltip();
                unByKey(listener);
            });
        }
    }

    function createHelpTooltip() {
        if (helpTooltipElement) {
            helpTooltipElement.parentNode.removeChild(helpTooltipElement);
        }
        helpTooltipElement = document.createElement('div');
        helpTooltipElement.className = 'ol-tooltip hidden';
        helpTooltip = new Overlay({
            element: helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        dmap.addOverlay(helpTooltip);
    }

    function createMeasureTooltip() {
        if (measureTooltipElement) {
            measureTooltipElement.parentNode.removeChild(measureTooltipElement);
        }
        measureTooltipElement = document.createElement('div');
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
        measureTooltip = new Overlay({
            element: measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center',
            stopEvent: false,
            insertFirst: false
        });
        dmap.addOverlay(measureTooltip);
    }

    function saveDrawnFeature(event) {
        const feature = event.feature;
        const clonedFeature = feature.clone();
        setUndoStack((undoStack) => [...undoStack, clonedFeature]);
    }

    function undoLastDraw() {
        if (undoStack.length > 0) {
            const updatedStack = [...undoStack];
            const updatedTextStack = [...textStack];

            updatedStack.pop(); // 스택의 마지막 항목 제거
            const lastText = updatedTextStack.pop();

            if (lastText.tooltip.getElement() && lastText.tooltip.getElement().parentNode) {
                lastText.tooltip.getElement().parentNode.removeChild(lastText.tooltip.getElement());
            }
            lastText.tooltip.dispose();

            setUndoStack(updatedStack); // 업데이트된 스택으로 설정
            setTextStack(updatedTextStack);

            source.clear(); // 이전 도형들을 모두 지우고
            updatedStack.forEach((feature) => source.addFeature(feature));
        }
    }

    return (
        <>
            <div className="row" style={{ position: 'fixed', zIndex: '1100', padding: '10px', left: '360px' }}>
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
        </>
    );
};
export default Mapdrawer;
