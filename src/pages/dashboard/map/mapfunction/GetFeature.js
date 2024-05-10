import React, { useState, useEffect, useRef } from 'react';
import Overlay from 'ol/Overlay.js';

function GetFeature(map) {
    const container = document.getElementById('popup'); //팝업 컨테이너
    const popcontent = document.getElementById('popup-content'); //팝업 내용
    const closer = document.getElementById('popup-closer');

    var mapOverlay = new Overlay({ element: container });

    //마우스 올렸을 때
    map.on('pointermove', function (evt) {
        var coordinate = evt.coordinate; //마우스가 올려진 좌표값

        //마커가 있는 곳에 마우스가 올려지면 커서의 스타일을 pointer로 설정
        map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';

        //마우스를 다른 곳으로 옮길 때를 위해 스위치역할
        if (hover != null) {
            hover = null;
        }

        //마우스가 올려진 곳의 마커를 가져와 hover에 저장
        map.forEachFeatureAtPixel(evt.pixel, function (f) {
            hover = f;
            return true;
        });

        //마커가 있을 경우
        if (hover) {
            var content = "<div class='__float-tbl'>" + '클릭됨' + hover.get('name') + '</div>';

            //popup-content 부분에 content를 넣어줌
            popcontent.innerHTML = content;

            //오버레이의 좌표를 정해줌
            mapOverlay.setPosition(coordinate);
        } else {
            popcontent.innerHTML = '';
        }
    });
}

export default GetFeature;
