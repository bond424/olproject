import React, { useState, useEffect } from 'react';
import 'ol/ol.css'; //스타일
import { Map as OlMap, View } from 'ol'; //뷰 관리
import { get as getProjection } from 'ol/proj'; //위경도
import { Tile as TileLayer, Vector as VectorLayer, Group as LayerGroup } from 'ol/layer'; //지도타일
import XYZ from 'ol/source/XYZ.js';
import proj4 from 'proj4';
import { OSM, Vector as VectorSource } from 'ol/source.js';
// import { get } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import { transform } from 'ol/proj';
import { Grid } from '@mui/material';
import { Select, Translate, defaults as defaultInteractions } from 'ol/interaction.js';
import { useDispatch, useSelector } from 'react-redux';
import { setFeatureLayer } from 'store/slice/layerSlice';
import { activeDrawf } from 'store/reducers/menu';

import MapContext from './MapContext';

proj4.defs([
    [
        'EPSG:5179',
        '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    ]
]);
register(proj4);

const BaseMap = ({ children }) => {
    const dispatch = useDispatch();
    const [mapObject, setMapObject] = useState({});
    const { drawFeature, switchFeature } = useSelector((state) => state.menu);
    // const drawsource = new VectorSource({ wrapX: false });
    const { getLayerUrl } = useSelector((state) => state.menu);
    // const [tileLayerUrl, setTileLayerUrl] = useState();
    // const [showMainLayer, setShowMainLayer] = useState(true);
    // const [showSetSlayer, setShowSetSlayer] = useState(true);
    // const [vctLayer, setvctLayer] = useState(null);

    const { featureLayer } = useSelector((state) => state.layerRedycer);

    const drawsource = new VectorSource({ wrapX: false });

    useEffect(() => {
        dispatch(activeDrawf({ drawFeature: false }));
        // dispatch(setFeatureLayer());
    }, []);

    useEffect(() => {
        const initialCenterEPSG4326 = [126.64863, 35.7841];
        const initialCenterEPSG3857 = [14103346.019885818, 4277262.068647152];

        const transformedCenter = transform(initialCenterEPSG3857, 'EPSG:3857', 'EPSG:5179');

        const select = new Select();

        const translate = new Translate({
            features: select.getFeatures()
        });

        const setl = 'https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=N6cizo2S18gj0lhV1Lcv';
        const setSlayer = new TileLayer({
            source: new XYZ({
                attributions: '',
                url: setl
            }),
            name: 'setSlayer'
        });
        const mainlayer = new TileLayer({
            source: new XYZ({
                attributions: '',
                url: getLayerUrl
            }),
            visible: true,
            name: 'mainlayer'
        });
        const sat = 'https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=N6cizo2S18gj0lhV1Lcv';

        const map = new OlMap({
            // interactions: defaultInteractions().extend([select, translate]),
            layers: [setSlayer],
            target: 'map',
            view: new View({
                projection: getProjection('EPSG:5179'),
                center: transformedCenter,
                zoom: 13
            })
        });

        setMapObject({ map });
        return () => map.setTarget(undefined);
    }, []);

    useEffect(() => {
        if (featureLayer.length > 0) {
            console.log(featureLayer);
        }
    }, [featureLayer]);

    if (!mapObject) {
        return null;
    }

    return <MapContext.Provider value={mapObject}>{children}</MapContext.Provider>;
};
export default BaseMap;
