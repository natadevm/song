import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Song } from "../api/songsApi";

interface SongsState {
  songs: Song[];
  stats: any | null;
  loading: boolean;
  error: string | null;
}

// initial state
const initialState: SongsState = {
  songs: [],
  stats: null,
  loading: false,
  error: null,
};

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    // --- Request triggers (saga will listen) ---
    fetchSongs: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchStats: (state) => {
      state.loading = true;
      state.error = null;
    },
    addSong: (state, _action: PayloadAction<Song>) => {
      state.loading = true;
      state.error = null;
    },
    updateSong: (state, _action: PayloadAction<{ id: string; song: Song }>) => {
      state.loading = true;
      state.error = null;
    },
    deleteSong: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },

    // --- Success cases (saga dispatches these) ---
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.loading = false;
    },
    fetchStatsSuccess: (state, action: PayloadAction<any>) => {
      state.stats = action.payload;
      state.loading = false;
    },
    addSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
      state.loading = false;
    },
    updateSongSuccess: (state, action: PayloadAction<Song>) => {
      state.songs = state.songs.map((s) =>
        s._id === action.payload._id ? action.payload : s
      );
      state.loading = false;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter((s) => s._id !== action.payload);
      state.loading = false;
    },

    // --- Failure ---
    requestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSongs,
  fetchStats,
  addSong,
  updateSong,
  deleteSong,
  fetchSongsSuccess,
  fetchStatsSuccess,
  addSongSuccess,
  updateSongSuccess,
  deleteSongSuccess,
  requestFailure,
} = songsSlice.actions;

export default songsSlice.reducer;
