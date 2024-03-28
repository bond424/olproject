import React, { useState, useEffect } from 'react';
import 'ol/ol.css'; //스타일
import { Map as OlMap, View } from 'ol'; //뷰 관리
import { GPX, GeoJSON, IGC, KML, TopoJSON } from 'ol/format.js';
import { fromLonLat, get as getProjection } from 'ol/proj'; //위경도
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'; //지도타일
import { OSM, TileWMS } from 'ol/source'; // OpenStreetMap source
import XYZ from 'ol/source/XYZ.js';
import { Vector as VectorSource } from 'ol/source.js';
import DragAndDrop from 'ol/interaction/DragAndDrop.js';
import proj4 from 'proj4';
import { get } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import { transform } from 'ol/proj';
import GeoTIFF from 'ol/source/GeoTIFF';
import MousePosition from 'ol/control/MousePosition';
import { defaults as defaultControls } from 'ol/control.js';
import { createStringXY } from 'ol/coordinate.js';
import { Grid, InputLabel, Container, MenuItem, FormControl, Select, Typography, Button } from '@mui/material';

const key = 'get_your_own_D6rA4zTHduk6KOKTXzGB';

proj4.defs([
    [
        'EPSG:5179',
        '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    ],
    ['EPSG:32641', '+proj=utm +zone=41 +datum=WGS84 +units=m +no_defs +type=crs']
]);
register(proj4);

const UploadMap = () => {
    const [mapObject, setMapObject] = useState({});
    const newkalayer1 = 'http://localhost:8099/geoserver/test/wms';
    const newkalayer = 'http://localhost:8099/geoserver/test2/wms';

    useEffect(() => {
        const geoserverWMSUrl3 = 'http://localhost:8099/geoserver/test/wms';

        const gifB_1 = new TileLayer({
            source: new TileWMS({
                url: newkalayer1,
                params: {
                    LAYERS: 'test:카자흐스탄_코스타나이_B1',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                name: 'B1',
                visible: false,
                serverType: 'geoserver'
            })
        });

        const gifB_2 = new TileLayer({
            source: new TileWMS({
                url: newkalayer,
                params: {
                    LAYERS: 'test2:카자흐스탄_코스타나이_B2',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                name: 'B2',
                visible: false,
                serverType: 'geoserver'
            })
        });

        const gifB_3 = new TileLayer({
            source: new TileWMS({
                url: newkalayer,
                params: {
                    LAYERS: 'test2:카자흐스탄_코스타나이_B3',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                name: 'B3',
                visible: false,
                serverType: 'geoserver'
            })
        });

        const gifB_4 = new TileLayer({
            source: new TileWMS({
                url: newkalayer,
                params: {
                    LAYERS: 'test2:카자흐스탄_코스타나이_B4',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                name: 'B4',
                visible: false,
                serverType: 'geoserver'
            })
        });

        const gifB_5 = new TileLayer({
            source: new TileWMS({
                url: newkalayer,
                params: {
                    LAYERS: 'test2:카자흐스탄_코스타나이_B5',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                name: 'B5',
                visible: false,
                serverType: 'geoserver'
            })
        });

        const gifB_6 = new TileLayer({
            source: new TileWMS({
                url: newkalayer,
                params: {
                    LAYERS: 'test2:카자흐스탄_코스타나이_B6',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                name: 'B6',
                visible: false,
                serverType: 'geoserver'
            })
        });

        const gifB_7 = new TileLayer({
            source: new TileWMS({
                url: newkalayer,
                params: {
                    LAYERS: 'test2:카자흐스탄_코스타나이_B7',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                name: 'B7',
                visible: false,
                serverType: 'geoserver'
            })
        });

        const gifS_1 = new TileLayer({
            source: new TileWMS({
                url: newkalayer,
                params: {
                    LAYERS: 'test2:코스타나이_20231017_RGB',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                name: 'S1',
                visible: false,
                serverType: 'geoserver'
            })
        });

        const gifS_2 = new TileLayer({
            source: new TileWMS({
                url: newkalayer,
                params: {
                    LAYERS: 'test2:코스타나이_202403_식생지수',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                name: 'S2',
                visible: false,
                serverType: 'geoserver'
            })
        });

        const gifS_3 = new TileLayer({
            source: new TileWMS({
                url: newkalayer,
                params: {
                    LAYERS: 'test2:코스타나이_202406_식생지수',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                name: 'S3',
                visible: false,
                serverType: 'geoserver'
            })
        });

        const gifS_4 = new TileLayer({
            source: new TileWMS({
                url: newkalayer,
                params: {
                    LAYERS: 'test2:코스타나이_위성영상',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                name: 'S4',
                visible: false,
                serverType: 'geoserver'
            })
        });

        const geoTiffLayer3 = new TileLayer({
            source: new TileWMS({
                url: geoserverWMSUrl3,
                params: {
                    LAYERS: 'test:Ortho_5179',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                serverType: 'geoserver'
            })
        });

        // geoTiffLayer.getSource().on('error', function (event) {
        //     console.error('GeoTIFF 소스 로딩 중 오류 발생:', event);
        // });

        const initialCenterEPSG5179 = [126.8570817, 35.1723225];
        const initialCenterEPSG32641 = [546615.0418, 5891548.3976];

        const transformedCenter = transform(initialCenterEPSG32641, 'EPSG:4326', 'EPSG:32641');

        const baseMapLayer = new TileLayer({
            source: new XYZ({
                attributions: '',
                url: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=N6cizo2S18gj0lhV1Lcv'
            }),
            name: 'basemap'
        });

        const map = new OlMap({
            layers: [baseMapLayer, gifB_1, gifB_2, gifB_3, gifB_4, gifB_5, gifB_6, gifB_7, gifS_1, gifS_2, gifS_3, gifS_4],
            target: 'uploadmap',
            view: new View({
                projection: getProjection('EPSG:32641'),
                center: [542553.48129, 5892576.3976],
                zoom: 11
            })
        });

        setMapObject({ map });

        const vectorLayer = new VectorLayer({
            source: new VectorSource()
        });

        const featureOverlay = new VectorLayer({
            source: new VectorSource(),
            map: map,
            style: {
                'stroke-color': 'rgba(255, 255, 255, 0.7)',
                'stroke-width': 2
            }
        });

        const extractStyles = document.getElementById('extractstyles');
        let dragAndDropInteraction;

        function setInteraction() {
            if (dragAndDropInteraction) {
                map.removeInteraction(dragAndDropInteraction);
            }
            dragAndDropInteraction = new DragAndDrop({
                formatConstructors: [
                    GPX,
                    GeoJSON,
                    IGC,
                    // use constructed format to set options
                    new KML({ extractStyles: true }),
                    TopoJSON
                ]
            });
            dragAndDropInteraction.on('addfeatures', function (event) {
                const vectorSource = new VectorSource({
                    features: event.features
                });
                vectorLayer.setSource(vectorSource);
                map.addLayer(vectorLayer);
                map.getView().fit(vectorLayer.getSource().getExtent());
            });
            map.addInteraction(dragAndDropInteraction);
        }
        setInteraction();

        let highlight;
        const displayFeatureInfo = function (pixel) {
            vectorLayer.getFeatures(pixel).then(function (features) {
                const feature = features.length ? features[0] : undefined;
                if (feature !== highlight) {
                    if (highlight) {
                        featureOverlay.getSource().removeFeature(highlight);
                    }
                    if (feature) {
                        featureOverlay.getSource().addFeature(feature);
                    }
                    highlight = feature;
                }
            });
        };

        map.on('pointermove', function (evt) {
            if (evt.dragging) {
                return;
            }
            const pixel = map.getEventPixel(evt.originalEvent);
            displayFeatureInfo(pixel);
        });

        // map.on('click', function (evt) {
        //     displayFeatureInfo(evt.pixel);
        // });
        return () => map.setTarget(undefined);
    }, []);

    const [maptif, setmaptif] = useState();

    const handleChange = (event) => {
        const value = event.target.value;

        mapObject.map.getLayers().forEach((layer) => {
            if (layer.get('name') === 'basemap') {
                layer.setVisible(true);
            }
            layer.setVisible(false);
        });

        mapObject.map.getLayers().forEach((layer) => {
            if (layer.get('name') === value) {
                layer.setVisible(true);
            }
        });
    };

    return (
        <Grid container>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">지도선택</InputLabel>
                <Select labelId="demo-select-small-label" id="demo-select-small" value={maptif} label="Age" onChange={handleChange}>
                    <MenuItem value="B1">카자흐스탄_코스타나이_B1</MenuItem>
                    <MenuItem value="B2">카자흐스탄_코스타나이_B2</MenuItem>
                    <MenuItem value="B3">카자흐스탄_코스타나이_B3</MenuItem>
                    <MenuItem value="B4">카자흐스탄_코스타나이_B4</MenuItem>
                    <MenuItem value="B5">카자흐스탄_코스타나이_B5</MenuItem>
                    <MenuItem value="B6">카자흐스탄_코스타나이_B6</MenuItem>
                    <MenuItem value="B7">카자흐스탄_코스타나이_B7</MenuItem>
                    <MenuItem value="S1">코스타나이_202403_식생지수</MenuItem>
                    <MenuItem value="S2">코스타나이_202406_식생지수</MenuItem>
                    <MenuItem value="S3">코스타나이_20231017_RGB</MenuItem>
                    <MenuItem value="S4">코스타나이_위성영상</MenuItem>
                </Select>
            </FormControl>
            <div id="uploadmap" value={mapObject} style={{ width: '100%', height: '50rem' }}></div>
        </Grid>
    );
};
export default UploadMap;
