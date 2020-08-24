import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { setAuthenticated, setUnauthenticated } from "./actions/authAction";
import { setLoading, clearUi } from "./actions/uiAction";

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export const mapStateToProps = (state) => {
  return {
    ui: state.ui,
    isAuthenticated: state?.user?.isAuthenticated,
    userInfo: state?.user?.data
  }
}
export const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: ()=>dispatch(setLoading()),
    clearUi: ()=>dispatch(clearUi()),
    setAuthenticated: ()=>dispatch(setAuthenticated()),
    setUnauthenticated: ()=>dispatch(setUnauthenticated())
  }
}

export default store;