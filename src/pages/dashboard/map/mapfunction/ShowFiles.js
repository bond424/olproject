import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Vector as VectorLayer, Group as LayerGroup } from 'ol/layer';
import { Box, Button } from '@mui/material';
import { Draw, Modify } from 'ol/interaction.js';
import { Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Fill, RegularShape, Stroke, Style, Text } from 'ol/style.js';
import { Select, Translate } from 'ol/interaction.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import * as shapefile from 'shapefile';
import iconv from 'iconv-lite';

import JSZip from 'jszip';

import MapContext from '../MapContext';

import { addSetGeojson, setCorfile, strdbfset, stsetgeo, setalert, getallvctlist, setshpvi } from 'store/slice/geofileSlice';

const ShowFiles = () => {
    const { map } = useContext(MapContext);

    const dispatch = useDispatch();

    const { geojsondata, getAllFiles, startdbfset, stgeojsondata, insertalert, shpvi, allvctlist } = useSelector(
        (state) => state.geofileRedycer
    );

    const [source, setSource] = useState();
    const [vector, setVector] = useState();
    const [defile, setdefile] = useState(null);
    const [vsarr, setvsarr] = useState([]);

    useEffect(() => {
        if (map !== undefined) {
            const sets = new VectorSource();
            setSource(sets);
            map.on('dblclick', function () {
                console.log(vsarr);
            });
        }
    }, [map]);

    useEffect(() => {
        if (vsarr.length > 0) {
            console.log(vsarr);
            console.log(allvctlist);
        }
    }, [vsarr]);

    useEffect(() => {
        if (map !== undefined) {
            const setv = new VectorLayer({
                source: source
            });
            setVector(setv);
        }
    }, [source]);

    // 최초 db의 모든 파일 호출용
    useEffect(() => {
        if (map !== undefined && getAllFiles.length > 0) {
            // Promise.resolve(dispatch(strdbfset(getAllFiles))).then(() => {
            //     setdefile(getAllFiles);
            // });
        }
    }, [map, getAllFiles]);

    useEffect(() => {
        if (map !== undefined && shpvi.length > 0 && shpvi !== undefined) {
            map.getLayers()
                .getArray()
                .forEach((layer) => {
                    if (layer instanceof VectorLayer || layer instanceof LayerGroup) {
                        if (layer.values_.id == shpvi) {
                            const currentVisibility = layer.getVisible();
                            layer.setVisible(!currentVisibility);
                        }
                    }
                });
            dispatch(setshpvi({ shpvi: [] }));
        }
    }, [shpvi]);

    useEffect(() => {
        if (startdbfset !== null && insertalert == true) {
            const blob = new Blob([startdbfset], { type: 'application/zip' });
            dbfZipfile(blob);
            dispatch(setalert({ insertalert: false }));
        }
    }, [startdbfset, insertalert]);

    const dbfZipfile = async (blob) => {
        try {
            const zip = await JSZip.loadAsync(blob);
            let shpfile;
            let dbffile;
            const dbfFiles = [];
            zip.forEach((relativePath, file) => {
                // dbfFiles.push(file);
                if (relativePath.endsWith('.dbf')) {
                    dbffile = file;
                    // dbfFiles.push(file);
                } else if (relativePath.endsWith('.shp')) {
                    shpfile = file;
                }
            });
            if (shpfile && dbffile) {
                await readShpFile(shpfile, dbffile);
            } else {
                console.error('SHP or DBF file not found in the ZIP archive.');
            }
        } catch (error) {
            console.error('Error processing ZIP file:', error);
        }
    };

    const readShpFile = async (shpFile, dbfFile) => {
        const fname = shpFile.name;
        try {
            const shpContent = await shpFile.async('arraybuffer');
            const dbfContent = await dbfFile.async('arraybuffer');

            const dbfBuffer = Buffer.from(dbfContent);
            const dbfDecoded = iconv.decode(dbfBuffer, 'euc-kr');

            const dbfEncoded = iconv.encode(dbfDecoded, 'utf-8');
            const dbfArrayBuffer = dbfEncoded.buffer;

            console.log('SHP Content:', shpContent);
            console.log('DBF Content:', dbfContent);
            console.log('DBF Array Buffer:', dbfArrayBuffer);

            const source = await shapefile.open(shpContent, dbfContent);
            const arr = [];
            let result;
            while (!(result = await source.read()).done) {
                const obj = {
                    geojson: result.value, // GeoJSON 출력
                    table: result.value.properties, // 속성 테이블 출력
                    name: fname
                };
                arr.push(obj);
            }

            const updatedGeojsonData = [...stgeojsondata, ...arr];
            dispatch(addSetGeojson({ geojsondata: arr }));
            dispatch(stsetgeo({ stgeojsondata: updatedGeojsonData }));
        } catch (error) {
            console.error('Error reading SHP file:', error);
        }
    };

    // shp 파일 업로드 시 객체 보여주는 기능
    useEffect(() => {
        if (geojsondata.length > 0) {
            console.log(geojsondata[0]);
            const geojsonObject = {
                name: geojsondata[0].name,
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

            const vectorSource = new VectorSource({
                features: geofobj
            });

            const vectorLayer = new VectorLayer({
                id: geojsondata[0].name,
                source: vectorSource
            });

            // const layerGroup = new LayerGroup({
            //     layers: [vectorLayer]
            // });

            map.addLayer(vectorLayer);
            var layerarr = [];
            map.getLayers()
                .getArray()
                .forEach((layer) => {
                    if (layer instanceof VectorLayer || layer instanceof LayerGroup) {
                        layerarr.push(layer);
                    }
                });
            setvsarr(layerarr);
            dispatch(getallvctlist({ allvctlist: layerarr }));
            // if (Array.isArray(geofobj)) {
            //     geofobj.forEach((feature) => source.addFeature(feature));
            // } else {
            //     console.error('GeoJSON readFeatures did not return an array of features.');
            // }
        }
    }, [geojsondata]);
};

export default ShowFiles;
