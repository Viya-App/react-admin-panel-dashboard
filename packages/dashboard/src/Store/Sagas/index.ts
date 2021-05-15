import axios from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

function* fetchUser() {
  try {
    const data = yield call(() => axios.get("https://www.google.com"));
    put({ type: "Anan", data });
  } catch (error) {
    put({ type: "Hata", error });
  }
}

export default function* () {
  yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
}
