import React, { useState, useEffect } from 'react';
import 'ol/ol.css'; //스타일
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'; //지도타일
import XYZ from 'ol/source/XYZ.js';
import proj4 from 'proj4';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { get } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import { transform } from 'ol/proj';
import Draw from 'ol/interaction/Draw.js';
import { Grid, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { activeItem, activeDrawf } from 'store/reducers/menu';

const Mapdrawer = (props) => {
    const { drawFeature } = useSelector((state) => state.menu);
    const { map, source } = props;

    useEffect(() => {
        const vectord = new VectorLayer({
            source: source
        });

        const dmap = map.map;

        dmap.addLayer(vectord);

        const typeSelect = document.getElementById('typeol');

        let draw; // global so we can remove it later
        function addInteraction() {
            const value = typeSelect.value;
            if (value !== 'None') {
                draw = new Draw({
                    source: source,
                    type: typeSelect.value
                });
                dmap.addInteraction(draw);
            }
        }

        typeSelect.onchange = function () {
            dmap.removeInteraction(draw);
            addInteraction();
        };
    }, []);

    return (
        <div class="row" style={{ position: 'fixed', zIndex: '1100' }}>
            <div class="col-auto">
                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                    팝업 열기
                </Button>
                <span class="input-group">
                    <select class="form-select" id="typeol">
                        <option value="Point">Point</option>
                        <option value="LineString">LineString</option>
                        <option value="Polygon">Polygon</option>
                        <option value="Circle">Circle</option>
                        <option value="None">None</option>
                    </select>
                    <input class="form-control" type="button" value="Undo" id="undo" />
                </span>
            </div>
        </div>
    );
};
export default Mapdrawer;
