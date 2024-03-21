import React, { useState, useEffect } from 'react';
import 'ol/ol.css'; //스타일
import { Map as OlMap, View } from 'ol'; //뷰 관리
import { fromLonLat, get as getProjection } from 'ol/proj'; //위경도
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'; //지도타일
import XYZ from 'ol/source/XYZ.js';
import proj4 from 'proj4';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { get } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import { transform } from 'ol/proj';
import Draw from 'ol/interaction/Draw.js';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { activeItem, activeDrawf } from 'store/reducers/menu';

import Mapdrawer from './mapfunction/Mapdrawer';

proj4.defs([
    [
        'EPSG:5179',
        '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    ]
]);
register(proj4);

const key = 'get_your_own_D6rA4zTHduk6KOKTXzGB';

const BaseMap = () => {
    const [mapObject, setMapObject] = useState({});
    const { drawFeature } = useSelector((state) => state.menu);
    const drawsource = new VectorSource({ wrapX: false });

    useEffect(() => {
        const initialCenterEPSG5179 = [126.752, 37.4713];

        const transformedCenter = transform(initialCenterEPSG5179, 'EPSG:4326', 'EPSG:5179');

        const map = new OlMap({
            layers: [
                new TileLayer({
                    source: new XYZ({
                        attributions: '',
                        url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=' + key
                    })
                })
            ],
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

    return (
        <Grid container>
            {drawFeature && <Mapdrawer map={mapObject} source={drawsource} />}
            <div id="map" value={mapObject} style={{ width: '100%', height: '55rem' }}></div>
        </Grid>
    );
};
export default BaseMap;
