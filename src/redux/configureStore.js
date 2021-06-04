import {createStore, combineReducers, applyMiddleware } from 'redux';
//import {Reducer, initialState} from './reducer';
//import is now divided
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {Dishes} from './dishes';
import {Leaders} from './leaders';
import {Promotions} from './promotions';
import {Comments} from './comments';

export const ConfigureStore = () =>{
    const store = createStore(
        combineReducers({
            dishes: Dishes,
            promotions: Promotions,
            leaders: Leaders,
            comments: Comments
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}