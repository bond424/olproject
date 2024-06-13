import React, { useState, useEffect, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Viewer } from '@photo-sphere-viewer/core';
import '@photo-sphere-viewer/core/index.css';

import MapContext from '../MapContext';

const MapsphereViewer = () => {
    const dispatch = useDispatch();
    const { map } = useContext(MapContext);
    const baseUrl = 'https://photo-sphere-viewer-data.netlify.app/assets/';
    const viewerRef = useRef(null);
    const viewerInstanceRef = useRef(null); // Viewer 인스턴스를 저장할 ref

    useEffect(() => {
        console.log('2');
        if (viewerRef.current && !viewerInstanceRef.current) {
            viewerInstanceRef.current = new Viewer({
                container: viewerRef.current,
                panorama: baseUrl + 'sphere.jpg'
            });
        }

        return () => {
            if (viewerInstanceRef.current) {
                viewerInstanceRef.current.destroy();
                viewerInstanceRef.current = null;
            }
        };
    }, [baseUrl]);

    return (
        <>
            <div id="sqviewer" ref={viewerRef} style={{ width: '100%', height: '800px' }}></div>
        </>
    );
};

export default MapsphereViewer;
