import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css'; //스타일
import { GPX, GeoJSON, IGC, KML, TopoJSON } from 'ol/format.js';
import { Tile as TileLayer, Vector as VectorLayer, VectorImage as VectorImageLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source.js';
import DragAndDrop from 'ol/interaction/DragAndDrop.js';
import { useDispatch, useSelector } from 'react-redux';

function MapUploadData(map) {
    const dragAndDropInteraction = new DragAndDrop({
        formatConstructors: [GPX, GeoJSON, IGC, KML, TopoJSON]
    });

    map.addInteraction(dragAndDropInteraction);

    dragAndDropInteraction.on('addfeatures', function (event) {
        const vectorSource = new VectorSource({
            features: event.features
        });
        map.addLayer(
            new VectorLayer({
                source: vectorSource
            })
        );
        map.getView().fit(vectorSource.getExtent());
    });

    const displayFeatureInfo = function (pixel) {
        const features = [];
        map.forEachFeatureAtPixel(pixel, function (feature) {
            features.push(feature);
        });
        if (features.length > 0) {
            const info = [];
            let i, ii;
            for (i = 0, ii = features.length; i < ii; ++i) {
                info.push(features[i].get('name'));
            }
            // document.getElementById('info').innerHTML = info.join(', ') || '&nbsp';
        }
    };

    map.on('pointermove', function (evt) {
        if (evt.dragging) {
            return;
        }
        const pixel = map.getEventPixel(evt.originalEvent);
        displayFeatureInfo(pixel);
    });

    map.on('click', function (evt) {
        displayFeatureInfo(evt.pixel);
    });
}

export default MapUploadData;
