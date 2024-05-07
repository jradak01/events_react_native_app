import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import eventReducer from './reducers/eventi';
import loginReducer from './reducers/login';
import prijavaReducer from './reducers/prijave';
import filterReducer from './reducers/filteri';

const glavniReducer = combineReducers({
    eventi: eventReducer,
    login: loginReducer,
    prijave: prijavaReducer,
    filter: filterReducer,
});

export const Store = createStore(glavniReducer, applyMiddleware(thunk));
