import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css'; //스타일
import { Map as OlMap, View } from 'ol'; //뷰 관리
import { GPX, GeoJSON, IGC, KML, TopoJSON } from 'ol/format.js';
import { fromLonLat, get as getProjection } from 'ol/proj'; //위경도
import { Tile as TileLayer, Vector as VectorLayer, Image as ImageLayer } from 'ol/layer'; //지도타일
import { OSM, TileWMS, ImageWMS } from 'ol/source'; // OpenStreetMap source
import XYZ from 'ol/source/XYZ.js';
import { Vector as VectorSource } from 'ol/source.js';
import DragAndDrop from 'ol/interaction/DragAndDrop.js';
import proj4 from 'proj4';
// import { get } from 'ol/proj';
import { register } from 'ol/proj/proj4';
// import { transform } from 'ol/proj';
// import GeoTIFF from 'ol/source/GeoTIFF';
import MousePosition from 'ol/control/MousePosition';
// import { defaults as defaultControls } from 'ol/control.js';
import { Select, Translate, defaults as defaultInteractions } from 'ol/interaction.js';
import { createStringXY } from 'ol/coordinate.js';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import MapPopup from './mapfuc/mapoverlay';
import Mapdrawer from './mapfuc/vcmapdrawer';

import './static/uploadjs.css';

import { activeDrawf } from 'store/reducers/menu';

const key = 'get_your_own_D6rA4zTHduk6KOKTXzGB';

proj4.defs([
    [
        'EPSG:5179',
        '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    ],
    [
        'EPSG:5186',
        '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=600000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs'
    ]
]);
register(proj4);

const UploadMap = () => {
    const dispatch = useDispatch();
    const [mapObject, setMapObject] = useState({});
    const [popset, setpopset] = useState(false);
    const newkalayer1 = 'http://localhost:8099/geoserver/test/wms';
    const { drawFeature } = useSelector((state) => state.menu);
    const { getLayerUrl, vctDrawer, vectordLayer } = useSelector((state) => state.menu);
    const drawsource = new VectorSource({ wrapX: false });

    useEffect(() => {
        const gifB_1 = new ImageLayer({
            source: new ImageWMS({
                url: newkalayer1,
                params: {
                    LAYERS: 'test:35602079s',
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
        const baseMapLayer = new TileLayer({
            source: new XYZ({
                attributions: '',
                url: 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=N6cizo2S18gj0lhV1Lcv'
            }),
            name: 'basemap'
        });

        const mainlayer = new TileLayer({
            source: new XYZ({
                attributions: '',
                url: getLayerUrl
            }),
            visible: true,
            name: 'mainlayer'
        });

        const mousePositionControl = new MousePosition({
            coordinateFormat: createStringXY(4),
            projection: 'EPSG:4326',
            className: 'custom-mouse-position',
            target: document.getElementById('mouse-position')
        });

        const select = new Select();

        const translate = new Translate({
            features: select.getFeatures()
        });

        const map = new OlMap({
            //controls: defaultControls().extend([mousePositionControl]),
            interactions: defaultInteractions().extend([select, translate]),
            layers: [baseMapLayer],
            target: 'uploadmap',
            view: new View({
                projection: getProjection('EPSG:4326'),
                center: [126.5337, 34.8419],
                zoom: 16
            })
        });

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

        setMapObject({ map });
        setpopset(true);
        return () => map.setTarget(undefined);
    }, []);

    if (!mapObject) {
        return null;
    }

    return (
        <Grid container>
            <div id="uploadmap" value={mapObject} style={{ width: '100%', height: '62.3rem' }}>
                {popset && <MapPopup map={mapObject} />}
            </div>
            {drawFeature && <Mapdrawer map={mapObject} source={drawsource} />}
            {/* et~등등 선택자 사용해야됨 안그러면 에러발생 서로 다른 태그안에 삽입 */}
        </Grid>
    );
};
export default UploadMap;
