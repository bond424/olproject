// third-party
import { combineReducers } from 'redux';

// project import
import menu from './menu';
import layerRedycer from '../slice/layerSlice';

// ==============================|| COMBINE REDUCERS ||============================== //

const reducers = combineReducers({ menu, layerRedycer });

export default reducers;
