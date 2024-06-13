import geofileService from 'service/geofileService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// initial state
const initialState = {
    filefeatureLayer: [],
    setshpfiles: [],
    geojsondata: [],
    geofiles: [],
    dbfileList: [],
    getAllFiles: [],
    setcorfiles: [],
    stgeojsondata: [],
    startdbfset: [],
    insertalert: false,
    shpvi: [],
    shpchecked: false,
    allvctlist: []
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

export const getAllDBFiles = createAsyncThunk('geoFileController/getallDBFiles', async (info) => {
    const response = await geofileService.getAllDBFiles(info);
    return response.data;
});

export const strdbfset = createAsyncThunk('geoFileController/startdbfset', async (info) => {
    const response = await geofileService.startdbfset(info);
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
        },

        setCorfile(state, action) {
            state.setcorfiles = action.payload.setcorfiles;
        },

        stsetgeo(state, action) {
            state.stgeojsondata = action.payload.stgeojsondata;
        },

        setalert(state, action) {
            state.insertalert = action.payload.insertalert;
        },

        setshpvi(state, action) {
            state.shpvi = action.payload.shpvi;
        },

        setshpchecked(state, action) {
            state.shpchecked = action.payload.shpchecked;
        },

        getallvctlist(state, action) {
            state.allvctlist = action.payload.allvctlist;
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
        builder.addCase(getAllDBFiles.fulfilled, (state, action) => {
            state.getAllFiles = action.payload;
        });
        builder.addCase(strdbfset.fulfilled, (state, action) => {
            state.startdbfset = action.payload;
        });
    }
});

export const { addGeoFileLayer, addSetGeojson, setCorfile, stsetgeo, setalert, setshpvi, setshpchecked, getallvctlist } =
    geofileSlice.actions;

export default geofileSlice.reducer;
