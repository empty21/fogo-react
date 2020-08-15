import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reduxLogger from "redux-logger"
import { composeWithDevTools } from "redux-devtools-extension";
import rootState from "./reducers";


const initialState = {};

const store = createStore(
  rootState,
  initialState,
  composeWithDevTools(applyMiddleware(thunk,reduxLogger))
);

export default store;