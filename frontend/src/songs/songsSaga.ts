import { call, put, takeEvery } from "redux-saga/effects";
import { songsApi } from "../api/songsApi";
import type { Song } from "../api/songsApi";
import {
  fetchSongs,
  fetchSongsSuccess,
  fetchStats,
  fetchStatsSuccess,
  addSong,
  addSongSuccess,
  updateSong,
  updateSongSuccess,
  deleteSong,
  deleteSongSuccess,
  requestFailure,
} from "./songsSlice";

// --- Worker sagas ---

function* handleFetchSongs() {
  try {
    const response = yield call(songsApi.getAll);
    yield put(fetchSongsSuccess(response.data));
  } catch (error: any) {
    yield put(requestFailure(error.message));
  }
}

function* handleFetchStats() {
  try {
    const response = yield call(songsApi.stats);
    yield put(fetchStatsSuccess(response.data));
  } catch (error: any) {
    yield put(requestFailure(error.message));
  }
}

function* handleAddSong(action: { type: string; payload: Song }) {
  try {
    const response = yield call(songsApi.create, action.payload);
    yield put(addSongSuccess(response.data));
    yield put(fetchStats()); // Auto-refresh stats
  } catch (error: any) {
    yield put(requestFailure(error.message));
  }
}

function* handleUpdateSong(action: { type: string; payload: { id: string; song: Song } }) {
  try {
    const response = yield call(songsApi.update, action.payload.id, action.payload.song);
    yield put(updateSongSuccess(response.data));
    yield put(fetchStats()); // Auto-refresh stats
  } catch (error: any) {
    yield put(requestFailure(error.message));
  }
}

function* handleDeleteSong(action: { type: string; payload: string }) {
  try {
    yield call(songsApi.remove, action.payload);
    yield put(deleteSongSuccess(action.payload));
    yield put(fetchStats()); // Auto-refresh stats
  } catch (error: any) {
    yield put(requestFailure(error.message));
  }
}

// --- Watcher saga ---
export default function* songsSaga() {
  yield takeEvery(fetchSongs.type, handleFetchSongs);
  yield takeEvery(fetchStats.type, handleFetchStats);
  yield takeEvery(addSong.type, handleAddSong);
  yield takeEvery(updateSong.type, handleUpdateSong);
  yield takeEvery(deleteSong.type, handleDeleteSong);
}
