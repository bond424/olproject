import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { toStringHDMS } from 'ol/coordinate';
import { toLonLat } from 'ol/proj.js';
import { containsExtent, containsXY, containsCoordinate } from 'ol/extent';
import GeoJSON from 'ol/format/GeoJSON.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Vector as VectorLayer } from 'ol/layer.js';

import MapContext from './MapContext';
import Mapdrawer from './mapfunction/Mapdrawer';
import MapSwitch from './mapfunction/MapSwitch';
import MapUploadData from './mapfunction/MapUploadData';
import MapPopup from './mapfunction/MapPopup';
import MapPopupTable from './mapfunction/MapPopupTable';

import './mapfunction/static/olpopup.css';

import { filterVectorList } from 'store/reducers/menu';
import { getAllVectorLayer } from 'store/slice/layerSlice';

const BaseMapUI = () => {
    const dispatch = useDispatch();
    const { map } = useContext(MapContext);
    const { switchFeature, getvectors } = useSelector((state) => state.menu);
    const { filefeatureLayer } = useSelector((state) => state.geofileRedycer);
    const { geojsondata } = useSelector((state) => state.geofileRedycer);
    const { vectorLayerList } = useSelector((state) => state.layerRedycer);
    const [vectorlist, setvertorList] = useState([]);

    function removeOverlayById(overlayId) {
        const overlays = map.getOverlays().getArray();
        const overlayToRemove = overlays.find((overlay) => overlay.ol_uid === overlayId);
        if (overlayToRemove) {
            map.removeOverlay(overlayToRemove);
            console.log('Overlay removed:', overlayId);
        } else {
            console.log('No overlay found with id:', overlayId);
        }
    }

    useEffect(() => {
        if (map !== undefined) {
            MapUploadData(map);
            var maplist = map.getAllLayers();
            setvertorList(maplist);
            var overlaylist = [];

            // 우클릭 시 실행
            map.on('contextmenu', function (evt) {
                let selected = null;
                evt.preventDefault();
                var coordinate = evt.coordinate;
                var hdms = toStringHDMS(toLonLat(coordinate));

                map.forEachFeatureAtPixel(evt.pixel, function (f) {
                    selected = f;
                    console.log(selected);
                });
                if (selected !== null) {
                    var selectedExtent = selected.getGeometry().getExtent();
                    MapPopupTable(map, coordinate, selected);
                    map.getOverlays().forEach(function (ov) {
                        if (containsCoordinate(selectedExtent, ov.getPosition())) {
                            let overid = { popid: ov.ol_uid, featureobj: selectedExtent };
                            const existingIndex = overlaylist.findIndex((e) => e.featureobj === selectedExtent);
                            if (existingIndex === -1) {
                                overlaylist.push(overid);
                            } else {
                                removeOverlayById(overlaylist[existingIndex].popid);
                                overlaylist[existingIndex] = overid;
                            }
                        }
                    });
                } else {
                    MapPopup(map, coordinate, hdms);
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);

    useEffect(() => {
        console.log(vectorlist);
        dispatch(filterVectorList({ getvectors: vectorlist }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vectorlist]);

    // const drawsource = new VectorSource({ wrapX: false });

    useEffect(() => {
        if (filefeatureLayer.length > 0) {
            const geojsonObject = {
                type: 'FeatureCollection',
                crs: {
                    type: 'name',
                    properties: {
                        name: 'EPSG:5179'
                    }
                },
                features: []
            };
            for (var i = 0; i < filefeatureLayer.length; i++) {
                geojsonObject.features.push(filefeatureLayer[i].geom);
            }
            console.log(geojsonObject);
            const geob = new GeoJSON().readFeatures(geojsonObject);
            const vectorSource = new VectorSource({
                features: geob
            });

            const vectorLayer = new VectorLayer({
                source: vectorSource
            });
            // map.addLayer(vectorLayer);
        }
    }, [filefeatureLayer]);

    useEffect(() => {
        // 시작 시
        if (map !== undefined) {
            const arr = [];
            map.getLayers().forEach((layer) => {
                if (layer instanceof VectorLayer) {
                    arr.push(...layer);
                }
            });
            console.log(arr);
            dispatch(getAllVectorLayer({ vectorLayerList: arr }));
        }
    }, [vectorLayerList]);

    useEffect(() => {
        if (geojsondata.length > 0) {
            const geojsonObject = {
                type: 'FeatureCollection',
                crs: {
                    type: 'name',
                    properties: {
                        name: 'EPSG:5179'
                    }
                },
                features: []
            };
            for (var i = 0; i < geojsondata.length; i++) {
                geojsonObject.features.push(geojsondata[i].geojson);
            }
            const geob = new GeoJSON().readFeatures(geojsonObject);
            const vectorSource = new VectorSource({
                features: geob
            });

            const vectorLayer = new VectorLayer({
                source: vectorSource
            });
            map.addLayer(vectorLayer);
        }
    }, [geojsondata]);

    return (
        <Grid
            container
            sx={{
                position: 'relative'
            }}
        >
            {switchFeature && <MapSwitch map={map} />}
            <Mapdrawer />
            <div id="map" style={{ width: '100%', height: '61rem' }}></div>
        </Grid>
    );
};
export default BaseMapUI;
