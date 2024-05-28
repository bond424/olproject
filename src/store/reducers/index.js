// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import layerRedycer from '../slice/layerSlice';
import geofileRedycer from '../slice/geofileSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, layerRedycer, geofileRedycer });

export default reducers;
