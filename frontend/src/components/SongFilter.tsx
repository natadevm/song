import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  TextField,
  Grid,
  Paper,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useAppSelector } from "../common/hooks";
import type { Song } from "../api/songsApi";

interface SongFilterProps {
  onFilterChange: (filters: {
    genre: string;
    artist: string;
    album: string;
    search: string;
  }) => void;
}

export default function SongFilter({ onFilterChange }: SongFilterProps) {
  const { songs } = useAppSelector((state) => state.songs);
  const [filters, setFilters] = useState({
    genre: "",
    artist: "",
    album: "",
    search: "",
  });

  // Memoize unique values to prevent unnecessary recalculations
  const uniqueGenres = useMemo(() => 
    [...new Set(songs.map((song: Song) => song.gener).filter(Boolean))].sort(),
    [songs]
  );
  const uniqueArtists = useMemo(() => 
    [...new Set(songs.map((song: Song) => song.artist).filter(Boolean))].sort(),
    [songs]
  );
  const uniqueAlbums = useMemo(() => 
    [...new Set(songs.map((song: Song) => song.album).filter(Boolean))].sort(),
    [songs]
  );

  // Memoize the callback to prevent infinite re-renders
  const memoizedOnFilterChange = useCallback(onFilterChange, []);

  useEffect(() => {
    memoizedOnFilterChange(filters);
  }, [filters, memoizedOnFilterChange]);

  const handleFilterChange = useCallback((field: string, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleSelectChange = useCallback((field: string) => (event: SelectChangeEvent) => {
    handleFilterChange(field, event.target.value);
  }, [handleFilterChange]);

  const clearFilters = useCallback(() => {
    setFilters({
      genre: "",
      artist: "",
      album: "",
      search: "",
    });
  }, []);

  const activeFiltersCount = useMemo(() => 
    Object.values(filters).filter(value => value && value.trim()).length,
    [filters]
  );


  return (
    <Paper 
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
        p: 3,
        borderRadius: 2,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        mb: 3,
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          mb: 3, 
          fontWeight: 600,
          color: '#4a5568',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <FilterListIcon sx={{ color: '#667eea' }} />
        Filter & Search Songs
      </Typography>
      
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            size="small"
            label="Search songs..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: '#667eea', mr: 1 }} />,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.2)',
                },
              },
            }}
          />
        </Grid>
        
        <Grid item xs={12} sm={2}>
          <FormControl 
            fullWidth 
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.2)',
                },
              },
            }}
          >
            <InputLabel>Genre</InputLabel>
            <Select
              value={filters.genre}
              label="Genre"
              onChange={handleSelectChange('genre')}
            >
              <MenuItem value="">All Genres</MenuItem>
              {uniqueGenres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={2}>
          <FormControl 
            fullWidth 
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.2)',
                },
              },
            }}
          >
            <InputLabel>Artist</InputLabel>
            <Select
              value={filters.artist}
              label="Artist"
              onChange={handleSelectChange('artist')}
            >
              <MenuItem value="">All Artists</MenuItem>
              {uniqueArtists.map((artist) => (
                <MenuItem key={artist} value={artist}>
                  {artist}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={2}>
          <FormControl 
            fullWidth 
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                },
                '&.Mui-focused': {
                  backgroundColor: '#ffffff',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.2)',
                },
              },
            }}
          >
            <InputLabel>Album</InputLabel>
            <Select
              value={filters.album}
              label="Album"
              onChange={handleSelectChange('album')}
            >
              <MenuItem value="">All Albums</MenuItem>
              {uniqueAlbums.map((album) => (
                <MenuItem key={album} value={album}>
                  {album}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
            {activeFiltersCount > 0 && (
              <>
                <Chip
                  label={`${activeFiltersCount} filter${activeFiltersCount > 1 ? 's' : ''} active`}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(102, 126, 234, 0.1)',
                    color: '#667eea',
                    fontWeight: 500,
                    border: '1px solid rgba(102, 126, 234, 0.3)'
                  }}
                />
                <Chip
                  label="Clear All"
                  size="small"
                  onClick={clearFilters}
                  onDelete={clearFilters}
                  deleteIcon={<ClearIcon />}
                  sx={{
                    backgroundColor: 'rgba(229, 62, 62, 0.1)',
                    color: '#e53e3e',
                    fontWeight: 500,
                    border: '1px solid rgba(229, 62, 62, 0.3)',
                    '&:hover': {
                      backgroundColor: 'rgba(229, 62, 62, 0.2)',
                    },
                    '& .MuiChip-deleteIcon': {
                      color: '#e53e3e',
                      '&:hover': {
                        color: '#c53030',
                      }
                    }
                  }}
                />
              </>
            )}
            {activeFiltersCount === 0 && (
              <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                No active filters
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
