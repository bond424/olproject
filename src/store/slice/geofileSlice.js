import geofileService from 'service/geofileService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// initial state
const initialState = {
    filefeatureLayer: [],
    setshpfiles: []
};

export const getFileTable = createAsyncThunk('geoFileController/euckr_epsg', async () => {
    const response = await geofileService.getgeoFile();
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

        addSetshp(state, action) {
            state.setshpfiles = action.payload.setshpfiles;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFileTable.fulfilled, (state, action) => {
            state.filefeatureLayer = action.payload;
        });
    }
});

export const { addGeoFileLayer, addSetshp } = geofileSlice.actions;

export default geofileSlice.reducer;
