import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css'; //스타일
import Overlay from 'ol/Overlay.js';
// 객체 안 팝업
function MapPopupTable(map, coordinate, selected) {
    let element = document.createElement('div');
    element.classList.add('ol-popup');
    var createTable = document.createElement('table');
    var createTitle = document.createElement('div');
    var createA = document.createElement('a');
    var arr1 = [
        { name: '농장주', age: '나이', width: '넓이', purchaseHistory: '구매 이력' },
        { name: '네글자임', age: '10세', width: '223.35KM²', purchaseHistory: '2024.12.31 05:31' }
    ];
    createTitle.classList.add('popupTitle');
    createTable.className = 'popTable';
    element.appendChild(createTitle);
    element.appendChild(createTable);
    element.appendChild(createA);
    createA.className = 'ol-popup-closer';
    createA.id = 'popup-closer';
    for (var i = 0; i < 7; i++) {
        var createtr = document.createElement('tr');
        for (var j = 0; j < 4; j++) {
            var createtd = document.createElement('td');
            if (j === 0) {
                var tdtext = arr1[i].name;
                createtd.innerText = tdtext;
            } else if (j === 1) {
                var tdtext = arr1[i].age;
                createtd.innerText = tdtext;
            } else if (j === 2) {
                var tdtext = arr1[i].width;
                createtd.innerText = tdtext;
            } else if (j === 3) {
                var tdtext = arr1[i].purchaseHistory;
                createtd.innerText = tdtext;
            }
            createtr.appendChild(createtd);
        }
        createTable.appendChild(createtr);
    }
    createTable.firstChild.classList.add('trTitle');
    createTitle.innerHTML = '사용자 지정 이름';
    // element.innerHTML = `<a id="popup-closer" class="ol-popup-closer"></a>
    // <div id="popup-content">
    //     <p>객체 선택됨:</p>
    //     <p>객체 정보 표시 예정:</p>
    //     <code>${coordinate}</code>
    // </div>`;
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
