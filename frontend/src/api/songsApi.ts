import axios from "axios";

export interface Song {
  _id?: string;
  title: string;
  artist: string;
  album: string;
  gener: string;
}

const API_BASE = import.meta.env.VITE_API_URL + "/api";

export const songsApi = {
  getAll: () => axios.get<Song[]>(`${API_BASE}/songs`),
  create: (song: Song) => axios.post<Song>(`${API_BASE}/songs`, song),
  update: (id: string, song: Song) =>
    axios.put<Song>(`${API_BASE}/songs/${id}`, song),
  remove: (id: string) => axios.delete(`${API_BASE}/songs/${id}`),
  stats: () => axios.get(`${API_BASE}/songs/stats`),
};
