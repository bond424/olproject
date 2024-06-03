import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Vector as VectorLayer } from 'ol/layer';
import { Box, Button } from '@mui/material';
import { Draw, Modify } from 'ol/interaction.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style.js';
import { Select, Translate } from 'ol/interaction.js';
import GeoJSON from 'ol/format/GeoJSON.js';

//아이콘
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ControlCameraOutlinedIcon from '@mui/icons-material/ControlCameraOutlined';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import MapContext from '../MapContext';
// import cursorIcon from 'assets/images/icons/cursorIcon.svg';

import StyleFunction from './StyleFunction';
import { getTipPoint } from './context/letpoint';
import { addFeatureStack } from 'store/slice/layerSlice';

const Mapdrawer = () => {
    const dispatch = useDispatch();
    const { drawFeature } = useSelector((state) => state.menu);
    const { map } = useContext(MapContext);
    const [source, setSource] = useState();
    const [modify, setModify] = useState();
    const [vector, setVector] = useState();
    const flist = [];
    const [poList, setPoList] = useState([]);
    const { filefeatureLayer } = useSelector((state) => state.geofileRedycer);

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

    useEffect(() => {
        if (map !== undefined) {
            const sets = new VectorSource();
            setSource(sets);
        }
    }, [map]);

    useEffect(() => {
        if (map !== undefined) {
            const setm = new Modify({ source: source, style: modifyStyle });
            setModify(setm);
            const setv = new VectorLayer({
                source: source,
                style: function (feature) {
                    return StyleFunction(feature);
                }
            });
            setVector(setv);
        }
    }, [source]);

    useEffect(() => {
        if (map !== undefined) {
            if (vector !== undefined && modify !== undefined) {
                map.addLayer(vector);
                map.addInteraction(modify);
                map.on('dblclick', function () {
                    console.log(map.getAllLayers());
                });
            }
        }
    }, [modify, vector]);

    // useEffect(() => {
    //     if (filefeatureLayer.length > 0 && source) {
    //         const geojsonObject = {
    //             type: 'FeatureCollection',
    //             crs: {
    //                 type: 'name',
    //                 properties: {
    //                     name: 'EPSG:5179'
    //                 }
    //             },
    //             features: []
    //         };
    //         for (var i = 0; i < filefeatureLayer.length; i++) {
    //             geojsonObject.features.push(filefeatureLayer[i].geom);
    //         }
    //         const geofobj = new GeoJSON().readFeatures(geojsonObject);

    //         if (Array.isArray(geofobj)) {
    //             geofobj.forEach((feature) => source.addFeature(feature));
    //         } else {
    //             console.error('GeoJSON readFeatures did not return an array of features.');
    //         }
    //     }
    // }, [filefeatureLayer, source]);

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
                modify.setActive(false);
                tip = activeTip;
            });
            draw.on('drawend', function (e) {
                var feature = e.feature;
                modifyStyle.setGeometry(getTipPoint);
                modify.setActive(true);
                map.once('pointermove', function () {
                    modifyStyle.setGeometry();
                });
                tip = idleTip;
                setTimeout(function () {
                    getAllFeatures(feature);
                }, 0);
            });
            modify.setActive(true);
            map.addInteraction(draw);
            draw.getOverlay().changed();
        }
    }

    function addSelect() {
        addInteraction('None');
        map.addInteraction(select);
        map.addInteraction(translate);
    }

    function getAllFeatures(feature) {
        const arr = [];
        flist.push(feature);
        // setPoList([poList]);
        // console.log(poList);
        map.getLayers().forEach((layer) => {
            if (layer instanceof VectorLayer) {
                const features = layer.getSource().getFeatures();
                arr.push(...features);
            }
        });
        dispatch(addFeatureStack({ featurestack: arr }));
    }

    return (
        <>
            {drawFeature && (
                <div
                    className="row"
                    style={{
                        position: 'absolute',
                        zIndex: '1100',
                        right: '20px',
                        top: '140px'
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
                                onClick={() => addInteraction('Point')}
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
                                    <LocationOnOutlinedIcon
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
                                포인트
                            </Button>
                            <Button
                                onClick={() => addInteraction('LineString')}
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
                                    <DesignServicesOutlinedIcon
                                        sx={{
                                            marginBottom: '0px',
                                            marginTop: '6px',
                                            width: '26px',
                                            height: '26px',
                                            color: '#72737B',
                                            transition: 'color 0.2s'
                                        }}
                                    />
                                }
                            >
                                줄
                            </Button>
                            <Button
                                onClick={() => addInteraction('Polygon')}
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
                                    <PentagonOutlinedIcon
                                        sx={{
                                            marginBottom: '0px',
                                            marginTop: '4px',
                                            width: '26px',
                                            height: '26px',
                                            color: '#72737B',
                                            transition: 'color 0.2s'
                                        }}
                                    />
                                }
                            >
                                폴리곤
                            </Button>
                            <Button
                                onClick={() => addInteraction('Circle')}
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
                                    <CircleOutlinedIcon
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
                                원형
                            </Button>
                            <Button
                                onClick={addSelect} // Use direct function reference if no additional arguments are passed
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
                                    letterSpacing: -1,
                                    fontFamily: 'NotoSansKR',
                                    fontWeight: '800',
                                    ':hover': {
                                        backgroundColor: 'transparent',
                                        color: '#6995D5',
                                        '& .MuiSvgIcon-root': {
                                            color: '#6995D5',
                                            transition: 'color 0.2s'
                                        }
                                    }
                                }}
                                variant="contained"
                                startIcon={
                                    <ControlCameraOutlinedIcon
                                        sx={{
                                            marginBottom: '0px',
                                            marginTop: '2px',
                                            width: '28px',
                                            height: '28px',
                                            color: '#72737B'
                                        }}
                                    />
                                }
                            >
                                객체옮기기
                            </Button>
                            <Button
                                onClick={() => addInteraction('None')}
                                component="label"
                                sx={{
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
                                    <NearMeOutlinedIcon
                                        sx={{
                                            marginBottom: '0px',
                                            marginTop: '4px',
                                            width: '26px',
                                            height: '26px',
                                            transform: 'rotate(280deg)',
                                            color: '#72737B',
                                            transition: 'color 0.2s'
                                        }}
                                    />
                                }
                            >
                                마우스
                            </Button>
                        </Box>
                    </div>
                </div>
            )}
        </>
    );
};

export default Mapdrawer;
