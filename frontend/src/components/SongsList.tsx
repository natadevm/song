import { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Dialog,
  DialogTitle, DialogContent, DialogActions, Button, TextField,
  Typography, Box, Chip, Avatar
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { fetchSongs, deleteSong, updateSong } from "../songs/songsSlice";
import type { Song } from "../api/songsApi";
import SongFilter from "./SongFilter";

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  overflow: 'hidden',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  '& .MuiTableHead-root': {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    '& .MuiTableCell-head': {
      color: '#ffffff',
      fontWeight: 600,
      fontSize: '0.95rem',
    },
  },
  '& .MuiTableBody-root': {
    '& .MuiTableRow-root': {
      transition: 'all 0.3s ease',
      '&:hover': {
        backgroundColor: 'rgba(102, 126, 234, 0.05)',
        transform: 'scale(1.01)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
    },
    '& .MuiTableCell-root': {
      borderBottom: '1px solid rgba(102, 126, 234, 0.1)',
      padding: theme.spacing(2),
    },
  },
}));

const StyledIconButton = styled(IconButton)(() => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
  },
}));

export default function SongsList() {
  const dispatch = useAppDispatch();
  const { songs, loading, error } = useAppSelector((state) => state.songs);
  
  const [editDialog, setEditDialog] = useState<{ open: boolean; song: Song | null }>({
    open: false,
    song: null,
  });
  const [editFormData, setEditFormData] = useState<Song>({
    title: "",
    artist: "",
    album: "",
    gener: "",
  });
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);

  useEffect(() => {
    dispatch(fetchSongs());
  }, [dispatch]);

  useEffect(() => {
    setFilteredSongs(songs);
  }, [songs]);

  const handleFilterChange = (filters: {
    genre: string;
    artist: string;
    album: string;
    search: string;
  }) => {
    let filtered = [...songs]; // Create a copy to avoid mutations

    // Apply search filter first (most flexible)
    if (filters.search && filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase().trim();
      filtered = filtered.filter((song: Song) => {
        const title = song.title?.toLowerCase() || '';
        const artist = song.artist?.toLowerCase() || '';
        const album = song.album?.toLowerCase() || '';
        const genre = song.gener?.toLowerCase() || '';
        
        return title.includes(searchTerm) ||
               artist.includes(searchTerm) ||
               album.includes(searchTerm) ||
               genre.includes(searchTerm);
      });
    }

    // Apply specific filters with case-insensitive matching
    if (filters.genre && filters.genre.trim()) {
      filtered = filtered.filter((song: Song) => 
        song.gener?.toLowerCase() === filters.genre.toLowerCase()
      );
    }

    if (filters.artist && filters.artist.trim()) {
      filtered = filtered.filter((song: Song) => 
        song.artist?.toLowerCase() === filters.artist.toLowerCase()
      );
    }

    if (filters.album && filters.album.trim()) {
      filtered = filtered.filter((song: Song) => 
        song.album?.toLowerCase() === filters.album.toLowerCase()
      );
    }

    setFilteredSongs(filtered);
  };

  const handleEditClick = (song: Song) => {
    setEditFormData(song);
    setEditDialog({ open: true, song });
  };

  const handleEditClose = () => {
    setEditDialog({ open: false, song: null });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = () => {
    if (editDialog.song?._id && editFormData.title && editFormData.artist) {
      dispatch(updateSong({ id: editDialog.song._id, song: editFormData }));
      handleEditClose();
    }
  };

  if (loading) return <p>Loading songs...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
      <SongFilter onFilterChange={handleFilterChange} />
      
      <StyledPaper elevation={0}>
        <Box sx={{ p: 3, pb: 0 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              color: '#4a5568',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 2
            }}
          >
            <LibraryMusicIcon sx={{ color: '#667eea' }} />
            Songs Collection ({filteredSongs.length})
          </Typography>
        </Box>
        
        <StyledTableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MusicNoteIcon sx={{ fontSize: 18 }} />
                    Title
                  </Box>
                </TableCell>
                <TableCell>Artist</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>
                  <Chip 
                    label="Genre" 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: '#ffffff',
                      fontWeight: 500
                    }} 
                  />
                </TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSongs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <MusicNoteIcon sx={{ fontSize: 48, color: '#cbd5e0' }} />
                      <Typography variant="h6" color="text.secondary">
                        No songs found
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Try adjusting your filters or search terms
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                filteredSongs.map((song) => (
                  <TableRow key={song._id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar 
                          sx={{ 
                            width: 32, 
                            height: 32, 
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            fontSize: 14
                          }}
                        >
                          {song.title?.charAt(0)?.toUpperCase() || '?'}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {song.title || 'Untitled'}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {song.artist || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {song.album || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {song.gener ? (
                        <Chip 
                          label={song.gener} 
                          size="small" 
                          sx={{ 
                            backgroundColor: 'rgba(102, 126, 234, 0.1)',
                            color: '#667eea',
                            fontWeight: 500
                          }} 
                        />
                      ) : (
                        <Typography variant="body2" color="text.disabled">-</Typography>
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <StyledIconButton 
                        size="small" 
                        sx={{ 
                          color: '#667eea',
                          mr: 1,
                          '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.1)' }
                        }}
                        onClick={() => handleEditClick(song)}
                      >
                        <EditIcon fontSize="small" />
                      </StyledIconButton>
                      <StyledIconButton
                        size="small"
                        sx={{ 
                          color: '#e53e3e',
                          '&:hover': { backgroundColor: 'rgba(229, 62, 62, 0.1)' }
                        }}
                        onClick={() => song._id && dispatch(deleteSong(song._id))}
                      >
                        <DeleteIcon fontSize="small" />
                      </StyledIconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>
      </StyledPaper>

      <Dialog open={editDialog.open} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="title"
            value={editFormData.title}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Artist"
            name="artist"
            value={editFormData.artist}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Album"
            name="album"
            value={editFormData.album}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gener"
            name="gener"
            value={editFormData.gener}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
