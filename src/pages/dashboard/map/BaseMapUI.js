import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { toStringHDMS } from 'ol/coordinate';
import { toLonLat } from 'ol/proj.js';

import MapContext from './MapContext';
import Mapdrawer from './mapfunction/Mapdrawer';
import MapSwitch from './mapfunction/MapSwitch';
import GetFeature from './mapfunction/GetFeature';
import MapUploadData from './mapfunction/MapUploadData';
import MapPopup from './mapfunction/MapPopup';
import MapPopupTable from './mapfunction/MapPopupTable';

import './mapfunction/static/olpopup.css';

const BaseMapUI = () => {
    const { map } = useContext(MapContext);
    const { drawFeature, switchFeature } = useSelector((state) => state.menu);

    useEffect(() => {
        if (map !== undefined) {
            MapUploadData(map);

            // 우클릭 시 실행
            map.on('contextmenu', function (evt) {
                let selected = null;
                evt.preventDefault();
                var coordinate = evt.coordinate;
                var hdms = toStringHDMS(toLonLat(coordinate));

                map.forEachFeatureAtPixel(evt.pixel, function (f) {
                    selected = f;
                });
                if (selected !== null) {
                    MapPopupTable(map, coordinate, selected);
                } else {
                    MapPopup(map, coordinate, hdms);
                }
            });
        }
    }, [map]);

    // const drawsource = new VectorSource({ wrapX: false });

    return (
        <Grid container>
            {switchFeature && <MapSwitch map={map} />}
            {drawFeature && <Mapdrawer map={map} />}
            <div id="map" style={{ width: '100%', height: '61rem' }}></div>
        </Grid>
    );
};
export default BaseMapUI;
