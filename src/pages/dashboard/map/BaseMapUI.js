import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { OSM, Vector as VectorSource } from 'ol/source.js';

import MapContext from './MapContext';
import Mapdrawer from './mapfunction/Mapdrawer';
import MapSwitch from './mapfunction/MapSwitch';

const BaseMapUI = () => {
    const { map } = useContext(MapContext);
    const { drawFeature, switchFeature } = useSelector((state) => state.menu);

    const drawsource = new VectorSource({ wrapX: false });

    return (
        <Grid container>
            {switchFeature && <MapSwitch map={map} />}
            {drawFeature && <Mapdrawer map={map} source={drawsource} />}
            <div id="map" style={{ width: '100%', height: '61rem' }}></div>
        </Grid>
    );
};
export default BaseMapUI;
