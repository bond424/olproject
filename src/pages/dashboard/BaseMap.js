import React, { useState, useEffect } from 'react';
import 'ol/ol.css'; //스타일
import { Map as OlMap, View } from 'ol'; //뷰 관리
import { fromLonLat, get as getProjection } from 'ol/proj'; //위경도
import { Tile as TileLayer } from 'ol/layer'; //지도타일
import OSM from 'ol/source/OSM'; // OpenStreetMap source
import XYZ from 'ol/source/XYZ.js';
import proj4 from 'proj4';
import { get } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import { transform } from 'ol/proj';

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

    return <div id="map" value={mapObject} style={{ width: '100%', height: '55rem' }}></div>;
};
export default BaseMap;
