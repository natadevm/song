import { all } from "redux-saga/effects";
import songsSaga from "../songs/songsSaga";

export default function* rootSaga() {
  yield all([
    songsSaga(), 
  ]);
}
