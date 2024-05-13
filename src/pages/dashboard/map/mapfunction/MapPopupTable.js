import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css'; //스타일
import Overlay from 'ol/Overlay.js';

function MapPopupTable(map, coordinate, selected) {
    let element = document.createElement('div');
    element.classList.add('ol-popup');
    element.innerHTML = `<a id="popup-closer" class="ol-popup-closer"></a>
    <div id="popup-content">
        <p>객체 선택됨:</p>
        <p>객체 정보 표시 예정:</p>
        <code>${coordinate}</code>
    </div>`;
    element.style.display = 'block';
    const overlay = new Overlay({
        element: element,
        autoPan: true,
        className: 'multiPopup',
        autoPanMargin: 100,
        autoPanAnimation: {
            duration: 400
        }
    });

    overlay.setPosition(coordinate);
    map.addOverlay(overlay);

    let oElem = overlay.getElement();
    oElem.addEventListener('click', function (e) {
        var target = e.target;
        if (target.className == 'ol-popup-closer') {
            map.removeOverlay(overlay);
        }
    });
}

export default MapPopupTable;
