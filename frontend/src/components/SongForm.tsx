import { useState } from "react";
import { Box, TextField, Button, Paper, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch } from "../common/hooks";
import { addSong } from "../songs/songsSlice";
import type { Song } from "../api/songsApi";

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    '&.Mui-focused': {
      backgroundColor: '#ffffff',
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)',
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  padding: theme.spacing(1.5, 3),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
  },
}));

export default function SongForm() {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<Song>({
    title: "",
    artist: "",
    album: "",
    gener: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.artist) {
      alert("Title and artist are required");
      return;
    }
    dispatch(addSong(formData));
    setFormData({ title: "", artist: "", album: "", gener: "" });
  };

  return (
    <StyledPaper elevation={0}>
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
        <AddIcon sx={{ color: '#667eea' }} />
        Add New Song
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Song Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Artist"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              required
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Album"
              name="album"
              value={formData.album}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StyledTextField
              fullWidth
              label="Genre"
              name="gener"
              value={formData.gener}
              onChange={handleChange}
              variant="outlined"
            />
          </Grid>
        </Grid>
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <StyledButton 
            type="submit" 
            variant="contained" 
            startIcon={<AddIcon />}
            size="large"
          >
            Add Song
          </StyledButton>
        </Box>
      </Box>
    </StyledPaper>
  );
}
