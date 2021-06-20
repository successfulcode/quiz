import { combineReducers } from "redux";
import quizReducer from "./quiz";
import create from "./create";
import authReducer from "./auth";

export default combineReducers({
    quiz: quizReducer,
    create: create,
    auth: authReducer
})

