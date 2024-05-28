import geofileService from 'service/geofileService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// initial state
const initialState = {
    filefeatureLayer: []
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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getFileTable.fulfilled, (state, action) => {
            state.filefeatureLayer = action.payload;
        });
    }
});

export const { addGeoFileLayer } = geofileSlice.actions;

export default geofileSlice.reducer;
