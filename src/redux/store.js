import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; //middleware

import userReducer from './reducers/userReducer';
import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {}; //object

const middleware = [thunk];

const reducers = combineReducers({
  //combine above reducers

  user: userReducer, //every thing comes from userReducer store in user
  data: dataReducer,
  UI: uiReducer
});

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
