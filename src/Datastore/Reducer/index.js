import {combineReducers} from 'redux';
import itemReducer from './items';

const reducers = combineReducers({
    items: itemReducer
});

export default reducers;
