import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { setAuthenticated, setUnauthenticated } from "./actions/authAction";
import { setLoading, clearUi } from "./actions/uiAction";
import {isAuthenticatedSelector, loadingSelector, userInfoSelector} from "./selectors";

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(thunk)
);

export const mapStateToProps = (state) => {
  return {
    loading: loadingSelector(state),
    isAuthenticated: isAuthenticatedSelector(state),
    userInfo: userInfoSelector(state)
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