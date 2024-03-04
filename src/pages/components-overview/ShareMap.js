import React, { useState, useEffect } from 'react';
import 'ol/ol.css'; //스타일
import { Map, View } from 'ol';
import { fromLonLat, get as getProjection } from 'ol/proj'; //위경도
import { Tile as TileLayer } from 'ol/layer'; //지도타일
import OSM from 'ol/source/OSM'; // OpenStreetMap source
import XYZ from 'ol/source/XYZ.js';
import { getRenderPixel } from 'ol/render.js';

const key = 'get_your_own_D6rA4zTHduk6KOKTXzGB';
const attributions =
    '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
    '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const aerial = new TileLayer({
    source: new XYZ({
        attributions: attributions,
        url: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=' + key,
        maxZoom: 20,
        attributions: ''
    })
});

const view = new View({
    center: [-6655.5402445057125, 6709968.258934638],
    zoom: 13
});

const osm = new TileLayer({
    source: new OSM({
        attributions: ''
    })
});

const ShareMap = () => {
    const [mapObject, setMapObject] = useState({});

    useEffect(() => {
        const map = new Map({
            layers: [osm, aerial],
            target: 'aerialMap',
            view: view
        });

        setMapObject({ map });

        const swipe = document.getElementById('swipe');

        // Move the 'prerender' event listener inside useEffect
        const prerenderHandler = function (event) {
            const ctx = event.context;
            const mapSize = map.getSize();
            const width = mapSize[0] * (swipe.value / 100);
            const tl = getRenderPixel(event, [width, 0]);
            const tr = getRenderPixel(event, [mapSize[0], 0]);
            const bl = getRenderPixel(event, [width, mapSize[1]]);
            const br = getRenderPixel(event, mapSize);

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(tl[0], tl[1]);
            ctx.lineTo(bl[0], bl[1]);
            ctx.lineTo(br[0], br[1]);
            ctx.lineTo(tr[0], tr[1]);
            ctx.closePath();
            ctx.clip();
        };

        aerial.on('prerender', prerenderHandler);

        aerial.on('postrender', function (event) {
            const ctx = event.context;
            ctx.restore();
        });

        swipe.addEventListener('input', function () {
            map.render();
        });

        return () => {
            aerial.un('prerender', prerenderHandler);
            map.setTarget(undefined);
        };
    }, []);

    return (
        <div className="wrapper">
            <div id="aerialMap" className="map" value={mapObject} style={{ width: '100%', height: '53.7rem' }}></div>
            <input id="swipe" type="range" style={{ width: '99%' }} />
        </div>
    );
};
export default ShareMap;
