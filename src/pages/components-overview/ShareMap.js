import React, { useState, useEffect } from 'react';
import 'ol/ol.css'; //스타일
import { Map as OlMap, View } from 'ol'; //뷰 관리
import { GPX, GeoJSON, IGC, KML, TopoJSON } from 'ol/format.js';
import { fromLonLat, get as getProjection } from 'ol/proj'; //위경도
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'; //지도타일
import XYZ from 'ol/source/XYZ.js';
import { Vector as VectorSource } from 'ol/source.js';
import DragAndDrop from 'ol/interaction/DragAndDrop.js';
import proj4 from 'proj4';
import { get } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import { transform } from 'ol/proj';

import { useDispatch, useSelector } from 'react-redux';

proj4.defs([
    [
        'EPSG:5179',
        '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    ]
]);
register(proj4);

const ShareMap = () => {
    const dispatch = useDispatch();
    const [mapObject1, setMapObject1] = useState({});
    const [mapObject2, setMapObject2] = useState({});
    const [mapObject3, setMapObject3] = useState({});
    const [mapObject4, setMapObject4] = useState({});

    const { getLayerUrl } = useSelector((state) => state.menu);
    const satellitekey = 'https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=N6cizo2S18gj0lhV1Lcv';
    const toppkey = 'https://api.maptiler.com/maps/topo-v2/{z}/{x}/{y}.png?key=N6cizo2S18gj0lhV1Lcv';
    const nlcarkey = 'https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/{z}/{x}/{y}.png?key=N6cizo2S18gj0lhV1Lcv';

    useEffect(() => {
        const initialCenterEPSG5179 = [126.752, 37.4713];

        const transformedCenter = transform(initialCenterEPSG5179, 'EPSG:4326', 'EPSG:5179');

        const roadLayer = new TileLayer({
            source: new XYZ({
                attributions: '',
                url: getLayerUrl
            })
        });

        const satelliteLayer = new TileLayer({
            source: new XYZ({
                attributions: '',
                url: satellitekey
            })
        });

        const topoLayer = new TileLayer({
            source: new XYZ({
                attributions: '',
                url: toppkey
            })
        });

        const nldarkLayer = new TileLayer({
            source: new XYZ({
                attributions: '',
                url: nlcarkey
            })
        });

        const view = new View({
            projection: getProjection('EPSG:5179'),
            center: transformedCenter,
            zoom: 13
        });

        const map1 = new OlMap({
            layers: [roadLayer],
            target: 'roadmap',
            view: view
        });

        const map2 = new OlMap({
            layers: [satelliteLayer],
            target: 'satemap',
            view: view
        });

        const map3 = new OlMap({
            layers: [topoLayer],
            target: 'topoemap',
            view: view
        });

        const map4 = new OlMap({
            layers: [nldarkLayer],
            target: 'nlmap',
            view: view
        });

        setMapObject1({ map1 });
        setMapObject2({ map2 });
        setMapObject3({ map3 });
        setMapObject3({ map4 });

        return () => {
            map1.setTarget(undefined);
            map2.setTarget(undefined);
            map3.setTarget(undefined);
            map4.setTarget(undefined);
        };
    }, []);

    return (
        <div style={{ width: '100%', height: '58rem' }}>
            <div style={{ width: '100%', display: 'flex' }}>
                <div id="roadmap" value={mapObject1} style={{ width: '50%', height: '31rem' }}></div>
                <div id="satemap" value={mapObject2} style={{ width: '50%', height: '31rem' }}></div>
            </div>
            <div style={{ width: '100%', display: 'flex' }}>
                <div id="topoemap" value={mapObject3} style={{ width: '50%', height: '31rem' }}></div>
                <div id="nlmap" value={mapObject4} style={{ width: '50%', height: '31rem' }}></div>
            </div>
        </div>
    );
};
export default ShareMap;
