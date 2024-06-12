import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'ol/ol.css'; //스타일
import Overlay from 'ol/Overlay.js';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import MapContext from '../MapContext';
import ReactDOM from 'react-dom';

function MapPopupTable(props) {
    const dispatch = useDispatch();
    const { map } = useContext(MapContext);
    const { coord, selected } = props;

    console.log(selected);

    const rows = [
        { id: selected.values_.BJCD, lastName: 'Snow', firstName: 'Jon', age: 14 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 }
    ];

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
            width: 160
        }
    ];

    // const muielement = (
    //     <>
    //         <Box sx={{ height: 400, width: '100%' }}>
    //             <DataGrid
    //                 rows={rows}
    //                 columns={columns}
    //                 initialState={{
    //                     pagination: {
    //                         paginationModel: {
    //                             pageSize: 5
    //                         }
    //                     }
    //                 }}
    //                 pageSizeOptions={[5]}
    //                 checkboxSelection
    //                 disableRowSelectionOnClick
    //             />
    //         </Box>
    //     </>
    // );

    useEffect(() => {
        if (map !== undefined) {
            const popupContainer = document.createElement('div');
            popupContainer.style.position = 'absolute';

            // 팝업
            const overlay = new Overlay({
                element: popupContainer,
                autoPan: true,
                className: 'multiPopup',
                autoPanMargin: 100,
                autoPanAnimation: {
                    duration: 400
                }
            });

            ReactDOM.render(
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
                </Box>,
                popupContainer
            );

            overlay.setPosition(coord);
            map.addOverlay(overlay);

            let oElem = overlay.getElement();
            oElem.addEventListener('click', function (e) {
                var target = e.target;
                if (target.className == 'ol-popup-closer') {
                    map.removeOverlay(overlay);
                }
            });
            return () => {
                ReactDOM.unmountComponentAtNode(popupContainer);
            };
        }
    }, [map]);
}

export default MapPopupTable;
