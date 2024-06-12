import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Vector as VectorLayer } from 'ol/layer';
import { Box, Button } from '@mui/material';
import { Draw, Modify } from 'ol/interaction.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style.js';
import { Select, Translate } from 'ol/interaction.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import * as shapefile from 'shapefile';

import JSZip from 'jszip';

import MapContext from '../MapContext';

import { setCorfile, strdbfset } from 'store/slice/geofileSlice';

const ShowFiles = () => {
    const { map } = useContext(MapContext);

    const dispatch = useDispatch();

    const { geojsondata } = useSelector((state) => state.geofileRedycer);
    const { getAllFiles } = useSelector((state) => state.geofileRedycer);
    const { startdbfset } = useSelector((state) => state.geofileRedycer);
    const { stgeojsondata } = useSelector((state) => state.geofileRedycer);

    const [source, setSource] = useState();
    const [vector, setVector] = useState();
    const [defile, setdefile] = useState(null);

    useEffect(() => {
        if (map !== undefined) {
            const sets = new VectorSource();
            setSource(sets);
        }
    }, [map]);

    useEffect(() => {
        if (map !== undefined && getAllFiles.length > 0) {
            // Promise.resolve(dispatch(strdbfset(getAllFiles))).then(() => {
            //     setdefile(getAllFiles);
            // });
        }
    }, [map, getAllFiles]);

    useEffect(() => {
        if (defile !== null && startdbfset !== null) {
            const blob = new Blob([startdbfset], { type: 'application/zip' });
            // handleDownload(blob);
            setdefile(null);
        }
    }, [defile, startdbfset]);

    const dbfZipfile = async (blob) => {
        try {
            const zip = await JSZip.loadAsync(blob);

            const dbfFiles = [];
            zip.forEach((relativePath, file) => {
                if (relativePath.endsWith('.dbf')) {
                    dbfFiles.push(file);
                }
            });

            for (const dbfFile of dbfFiles) {
                const dbfContent = await dbfFile.async('arraybuffer');
                readDbfFile(new Blob([dbfContent], { type: 'application/octet-stream' }));
            }
        } catch (error) {
            console.error('Error processing ZIP file:', error);
        }
    };

    const readDbfFile = async (dbfFile) => {
        try {
            const dbfReader = new FileReader();
            var arr = [];
            dbfReader.onload = async (dbfEvent) => {
                try {
                    const dbfBuffer = dbfEvent.target.result;
                    const source = await shapefile.open(dbfBuffer);
                    let result;
                    while (!(result = await source.read()).done) {
                        var obj = {};
                        obj.geojson = result.value;
                        obj.table = result.value.properties;
                        arr.push(obj);
                    }
                    const updatedGeojsonData = [...stgeojsondata, ...arr];
                    dispatch(addSetGeojson({ geojsondata: arr }));
                    dispatch(stsetgeo({ stgeojsondata: updatedGeojsonData }));
                } catch (error) {
                    console.error('Error reading SHP/DBF files:', error);
                }
            };
            dbfReader.readAsArrayBuffer(dbfFile);
        } catch (error) {
            console.error('Error reading SHP file:', error);
        }
    };

    useEffect(() => {
        if (map !== undefined) {
            const setv = new VectorLayer({
                source: source
            });
            setVector(setv);
        }
    }, [source]);

    useEffect(() => {
        if (map !== undefined) {
            if (vector !== undefined) {
                map.addLayer(vector);
                map.on('dblclick', function () {
                    console.log(map.getAllLayers());
                });
            }
        }
    }, [vector]);

    useEffect(() => {
        if (geojsondata.length > 0) {
            console.log(geojsondata[0]);
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
            const geofobj = new GeoJSON().readFeatures(geojsonObject);

            if (Array.isArray(geofobj)) {
                geofobj.forEach((feature) => source.addFeature(feature));
            } else {
                console.error('GeoJSON readFeatures did not return an array of features.');
            }
        }
    }, [geojsondata, source]);
};

export default ShowFiles;
