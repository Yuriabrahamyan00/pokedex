/* eslint-disable import/prefer-default-export */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer/rootReducer';

export const store = createStore(rootReducer, applyMiddleware(thunk));
