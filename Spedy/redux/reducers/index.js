import { combineReducers } from "redux";
import userLocationReducer from "./userLocationReducer";
import UserDetailReducer from "./UserDetailReducer";

let reducers = combineReducers({
    userLocationReducer: userLocationReducer,
    UserDetailReducer:UserDetailReducer,

})

const rootReducer = (state, action) => {
    return reducers(state, action)
}

export default rootReducer