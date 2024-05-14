import layerService from 'service/layerService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// initial state
const initialState = {
    featureLayer: [],
    vactorStack: [],
    featurestack: []
};

export const setFeatureLayer = createAsyncThunk('layerController/vectorlayer', async () => {
    const response = await layerService.setFeatureLayer();
    return response.data;
});

// ==============================|| SLICE - MENU ||============================== //

const layerSlice = createSlice({
    name: 'layerSlice',
    initialState,
    reducers: {
        addFeatureLayer(state) {
            state.featureLayer = initialState.featureLayer;
        },

        activeComponent(state, action) {
            state.vactorStack = action.payload.vactorStack;
        },

        addFeatureStack(state, action) {
            state.featurestack = action.payload.featurestack;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setFeatureLayer.fulfilled, (state, action) => {
            state.featureLayer = action.payload;
        });
    }
});

export const { addFeatureLayer, activeComponent, addFeatureStack } = layerSlice.actions;

export default layerSlice.reducer;
