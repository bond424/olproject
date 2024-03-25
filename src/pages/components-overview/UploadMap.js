import React, { useState, useEffect } from 'react';
import 'ol/ol.css'; //스타일
import { Map as OlMap, View } from 'ol'; //뷰 관리
import { GPX, GeoJSON, IGC, KML, TopoJSON } from 'ol/format.js';
import { fromLonLat, get as getProjection } from 'ol/proj'; //위경도
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer'; //지도타일
import { OSM, TileWMS } from 'ol/source'; // OpenStreetMap source
import XYZ from 'ol/source/XYZ.js';
import { Vector as VectorSource } from 'ol/source.js';
import DragAndDrop from 'ol/interaction/DragAndDrop.js';
import proj4 from 'proj4';
import { get } from 'ol/proj';
import { register } from 'ol/proj/proj4';
import { transform } from 'ol/proj';
import GeoTIFF from 'ol/source/GeoTIFF';

const key = 'get_your_own_D6rA4zTHduk6KOKTXzGB';

proj4.defs([
    [
        'EPSG:5179',
        '+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
    ]
]);
register(proj4);

const UploadMap = () => {
    const [mapObject, setMapObject] = useState({});

    useEffect(() => {
        const geoserverWMSUrl = 'http://localhost:8099/geoserver/test/wms';

        const geoTiffLayer = new TileLayer({
            source: new TileWMS({
                url: geoserverWMSUrl,
                params: {
                    LAYERS: 'test:Seoul',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                serverType: 'geoserver'
            })
        });

        const geoserverWMSUrl3 = 'http://localhost:8099/geoserver/test/wms';

        const geoTiffLayer3 = new TileLayer({
            source: new TileWMS({
                url: geoserverWMSUrl3,
                params: {
                    LAYERS: 'test:Ortho_5179',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                serverType: 'geoserver'
            })
        });

        geoTiffLayer.getSource().on('error', function (event) {
            console.error('GeoTIFF 소스 로딩 중 오류 발생:', event);
        });

        const geoserverWMSUrl2 = 'http://localhost:8099/geoserver/test2/wms';

        const shplayer = new TileLayer({
            source: new TileWMS({
                url: geoserverWMSUrl2,
                params: {
                    LAYERS: 'test2:용지조서 종합본_949_5179',
                    TILED: true,
                    FORMAT: 'image/png',
                    VERSION: '1.1.1'
                },
                serverType: 'geoserver'
            })
        });

        const initialCenterEPSG5179 = [126.8570817, 35.1723225];

        const transformedCenter = transform(initialCenterEPSG5179, 'EPSG:4326', 'EPSG:5179');

        const baseMapLayer = new TileLayer({
            source: new XYZ({
                attributions: '',
                url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=' + key
            })
        });

        const map = new OlMap({
            layers: [baseMapLayer, geoTiffLayer, shplayer, geoTiffLayer3],
            target: 'uploadmap',
            view: new View({
                projection: getProjection('EPSG:5179'),
                center: transformedCenter,
                zoom: 13
            })
        });

        setMapObject({ map });

        const vectorLayer = new VectorLayer({
            source: new VectorSource()
        });

        // const geoTIFFLayer = new TileLayer({
        //     source: geosource
        // });

        //map.addLayer(geoTIFFLayer);

        const featureOverlay = new VectorLayer({
            source: new VectorSource(),
            map: map,
            style: {
                'stroke-color': 'rgba(255, 255, 255, 0.7)',
                'stroke-width': 2
            }
        });

        const extractStyles = document.getElementById('extractstyles');
        let dragAndDropInteraction;

        function setInteraction() {
            if (dragAndDropInteraction) {
                map.removeInteraction(dragAndDropInteraction);
            }
            dragAndDropInteraction = new DragAndDrop({
                formatConstructors: [
                    GPX,
                    GeoJSON,
                    IGC,
                    // use constructed format to set options
                    new KML({ extractStyles: true }),
                    TopoJSON
                ]
            });
            dragAndDropInteraction.on('addfeatures', function (event) {
                const vectorSource = new VectorSource({
                    features: event.features
                });
                // map.addLayer(
                //     new VectorLayer({
                //         source: vectorSource
                //     })
                // );
                //map.getView().fit(vectorSource.getExtent());
                vectorLayer.setSource(vectorSource);
                map.addLayer(vectorLayer);
                map.getView().fit(vectorLayer.getSource().getExtent());
            });
            map.addInteraction(dragAndDropInteraction);
        }
        setInteraction();

        //extractStyles.addEventListener('change', setInteraction);

        let highlight;
        const displayFeatureInfo = function (pixel) {
            vectorLayer.getFeatures(pixel).then(function (features) {
                const feature = features.length ? features[0] : undefined;
                if (feature !== highlight) {
                    if (highlight) {
                        featureOverlay.getSource().removeFeature(highlight);
                    }
                    if (feature) {
                        featureOverlay.getSource().addFeature(feature);
                    }
                    highlight = feature;
                }
            });
        };

        map.on('pointermove', function (evt) {
            if (evt.dragging) {
                return;
            }
            const pixel = map.getEventPixel(evt.originalEvent);
            displayFeatureInfo(pixel);
        });

        // map.on('click', function (evt) {
        //     displayFeatureInfo(evt.pixel);
        // });
        return () => map.setTarget(undefined);
    }, []);

    return <div id="uploadmap" value={mapObject} style={{ width: '100%', height: '55rem' }}></div>;
};
export default UploadMap;
