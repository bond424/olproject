import layerService from 'service/layerService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// initial state
const initialState = {
    featureLayer: [],
    vactorStack: []
};

const setFeatureLayer = createAsyncThunk("layerbase/vectorlayer", async () => {
    const response = await layerService.setFeatureLayer();
    return response.data;
})

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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(setFeatureLayer.fulfilled, (state, action) => {
            state.featureLayer = action.payload;
          });
    }
});


export const {
    addFeatureLayer,
    activeComponent
} = layerSlice.actions;

export default layerSlice.reducer;