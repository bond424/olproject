import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css'; //스타일
import Overlay from 'ol/Overlay.js';
// 객체 안 팝업
function MapPopupTable(map, coordinate, selected) {
    let element = document.createElement('div');
    element.classList.add('ol-popup');
    var createTable = document.createElement('table');
    var createTitle = document.createElement('div');
    var arr1 = [
        { name: '농장주', age: '나이', width: '넓이', purchaseHistory: '구매 이력' },
        { name: '네글자임', age: '10세', width: '223.35KM²', purchaseHistory: '2024.12.31 05:31' },
        { name: '김수한무', age: '101세', width: '31.35KM²', purchaseHistory: '2024.05.10 16:08' },
        { name: '홍길동', age: '50세', width: '1.76KM²', purchaseHistory: '2021.04.03 20:24' },
        { name: '김유한', age: '43세', width: '176.78M²', purchaseHistory: '2022.02.22 02:22' },
        { name: '고길동', age: '22세', width: '1018.13KM²', purchaseHistory: '2021.12.31 06:31' },
        { name: '유명한', age: '9세', width: '81.71KM²', purchaseHistory: '2022.12.31 19:23' }
    ];
    createTitle.classList.add('popupTitle');
    createTable.className = 'popTable';
    element.appendChild(createTitle);
    element.appendChild(createTable);
    for (var i = 0; i < 7; i++) {
        var createtr = document.createElement('tr');
        for (var j = 0; j < 4; j++) {
            var createtd = document.createElement('td');
            if (j === 0) {
                var tdtext = arr1[i].name; // '네글자임'
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
            // createtr.classList.add('popTableTd' + [j + 1]);
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
