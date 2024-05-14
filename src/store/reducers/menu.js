// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true,
    drawFeature: false,
    switchFeature: false,
    vcdrawFeature: false,
    switchvctFeature: false,
    getLayerUrl: 'https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=get_your_own_D6rA4zTHduk6KOKTXzGB',
    drawsource: null,
    getvectors: []
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.openItem = action.payload.openItem;
        },

        activeComponent(state, action) {
            state.openComponent = action.payload.openComponent;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen;
        },

        openRight(state, action) {
            state.rightMenuOpen = action.payload.rightMenuOpen;
        },

        openComponentDrawer(state, action) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen;
        },

        activeDrawf(state, action) {
            state.drawFeature = action.payload.drawFeature;
        },

        activeSwitchf(state, action) {
            state.switchFeature = action.payload.switchFeature;
        },

        activevcDrawf(state, action) {
            state.vcdrawFeature = action.payload.vcdrawFeature;
        },

        chageMap(state, action) {
            state.getLayerUrl = action.payload.getLayerUrl;
        },

        vctDrawer(state, action) {
            state.drawsource = action.payload.drawsource;
        },

        activevctSwitchf(state, action) {
            state.switchvctFeature = action.payload.switchvctFeature;
        },

        filterVectorList(state, action) {
            state.getvectors = action.payload.getvectors;
        }
    }
});

export default menu.reducer;

export const {
    activeItem,
    activeComponent,
    openDrawer,
    openComponentDrawer,
    openRight,
    activeDrawf,
    chageMap,
    activeSwitchf,
    vctDrawer,
    activevcDrawf,
    activevctSwitchf,
    filterVectorList
} = menu.actions;
