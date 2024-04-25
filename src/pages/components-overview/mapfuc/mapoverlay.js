import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css'; //스타일
import Overlay from 'ol/Overlay.js';
import { fromLonLat, toLonLat } from 'ol/proj.js';
import { toStringHDMS } from 'ol/coordinate.js';

const Mapoverlay = (props) => {
    const { map } = props;

    const dmap = map.map;

    useEffect(() => {
        const container = document.getElementById('popup');
        const content = document.getElementById('popup-content');
        const closer = document.getElementById('popup-closer');

        const overlay = new Overlay({
            element: container,
            autoPan: {
                animation: {
                    duration: 250
                }
            }
        });
        dmap.addOverlay(overlay);

        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        dmap.on('contextmenu', function (evt) {
            evt.preventDefault();
            const coordinate = evt.coordinate;
            const hdms = toStringHDMS(toLonLat(coordinate));
            const feature = dmap.forEachFeatureAtPixel(evt.pixel, function (fe) {
                return fe;
            });
            console.log(feature);

            content.innerHTML = '<p>You clicked here:</p><code>' + hdms + '</code>';
            overlay.setPosition(coordinate);
        });
    }, []);

    return (
        <div id="popup" className="ol-popup">
            <a href="#" id="popup-closer" className="ol-popup-closer">
                {/**/}
            </a>
            <div id="popup-content"></div>
        </div>
    );
};
export default Mapoverlay;
