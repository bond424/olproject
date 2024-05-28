import React, { useState, useEffect, useRef } from 'react';
import 'ol/ol.css'; //스타일
import Overlay from 'ol/Overlay.js';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'firstName',
        headerName: 'First name',
        width: 150,
        editable: true
    },
    {
        field: 'lastName',
        headerName: 'Last name',
        width: 150,
        editable: true
    },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 110,
        editable: true
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`
    }
];

const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
];

// 객체 안 팝업
function MapPopupTable(map, coordinate, selected) {
    let element = document.createElement('div');
    element.classList.add('ol-popup');

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

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5
                        }
                    }
                }}
                pageSizeOptions={[5]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}

export default MapPopupTable;
