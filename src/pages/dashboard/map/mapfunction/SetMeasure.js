import React from 'react';
import { Draw, Modify } from 'ol/interaction.js';
import { LineString, Point } from 'ol/geom.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { getArea, getLength } from 'ol/sphere.js';

import StyleFunction from './StyleFunction';

function SetMeasure(map) {
    const typeSelect = document.getElementById('type');
    const showSegments = document.getElementById('segments');
    const clearPrevious = document.getElementById('clear');

    const modify = new Modify({ source: source, style: modifyStyle });

    const vector = new VectorLayer({
        source: source,
        style: function (feature) {
            return StyleFunction(feature, showSegments.checked);
        }
    });

    map.addLayer(vector);
    map.addInteraction(modify);

    let draw;

    function addInteraction() {
        const drawType = typeSelect.value;
        const activeTip =
            'Click to continue drawing the ' +
            (drawType === 'Polygon' ? 'polygon' : 'line');
        const idleTip = 'Click to start measuring';
        let tip = idleTip;
        draw = new Draw({
            source: source,
            type: drawType,
            style: function (feature) {
                return StyleFunction(feature, showSegments.checked, drawType, tip, modify);
            },
        });
        draw.on('drawstart', function () {
            if (clearPrevious.checked) {
                source.clear();
            }
            modify.setActive(false);
            tip = activeTip;
        });
        draw.on('drawend', function () {
            modifyStyle.setGeometry(tipPoint);
            modify.setActive(true);
            map.once('pointermove', function () {
                modifyStyle.setGeometry();
            });
            tip = idleTip;
        });
        modify.setActive(true);
        map.addInteraction(draw);
    }

    typeSelect.onchange = function () {
        map.removeInteraction(draw);
        addInteraction();
    };

    addInteraction();

    showSegments.onchange = function () {
        vector.changed();
        draw.getOverlay().changed();
    };
}

export default SetMeasure;
