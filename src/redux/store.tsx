import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import { UserReducer } from './reducers/User';
import { PlayListReducer } from './reducers/PlayList';
import reduxThunk from 'redux-thunk';
import reduxPromise from 'redux-promise';

const reducer = combineReducers({
    UserReducer,
    PlayListReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, applyMiddleware(reduxThunk, reduxPromise));

export default store;
