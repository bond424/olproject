import geofileService from 'service/geofileService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// initial state
const initialState = {
    filefeatureLayer: [],
    setshpfiles: [],
    geojsondata: [],
    geofiles: [],
    dbfileList: []
};

export const getFileTable = createAsyncThunk('geoFileController/euckr_epsg', async () => {
    const response = await geofileService.getgeoFile();
    return response.data;
});

export const setDBShpFiles = createAsyncThunk('geoFileController/saveShpFiles', async (info) => {
    const response = await geofileService.setDBShpFiles(info);
    return response.data;
});

export const getDBShpFiles = createAsyncThunk('geoFileController/downloadShpFiles', async (info) => {
    const response = await geofileService.getDBShpFiles(info);
    return response.data;
});

// ==============================|| SLICE - MENU ||============================== //

const geofileSlice = createSlice({
    name: 'geofileSlice',
    initialState,
    reducers: {
        addGeoFileLayer(state) {
            state.filefeatureLayer = initialState.filefeatureLayer;
        },

        addSetGeojson(state, action) {
            state.geojsondata = action.payload.geojsondata;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFileTable.fulfilled, (state, action) => {
            state.filefeatureLayer = action.payload;
        });
        builder.addCase(setDBShpFiles.fulfilled, (state, action) => {
            state.setshpfiles = action.payload;
        });
        builder.addCase(getDBShpFiles.fulfilled, (state, action) => {
            state.geofiles = action.payload;
        });
    }
});

export const { addGeoFileLayer, addSetGeojson } = geofileSlice.actions;

export default geofileSlice.reducer;
