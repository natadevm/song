import { useEffect } from "react";
import { 
  Grid, Card, CardContent, Typography, Box, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Divider, Chip, Avatar
} from "@mui/material";
import { styled } from "@mui/material/styles";
import BarChartIcon from "@mui/icons-material/BarChart";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import PersonIcon from "@mui/icons-material/Person";
import AlbumIcon from "@mui/icons-material/Album";
import CategoryIcon from "@mui/icons-material/Category";
import { useAppDispatch, useAppSelector } from "../common/hooks";
import { fetchStats } from "../songs/songsSlice";

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const StyledStatCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
  },
}));

export default function StatsPanel() {
  const dispatch = useAppDispatch();
  const { stats, loading, error } = useAppSelector((state) => state.songs);

  useEffect(() => {
    dispatch(fetchStats());
  }, [dispatch]);

  if (loading && !stats) return <p>Loading stats...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!stats) return null;

  const statCards = [
    { title: 'Total Songs', value: stats.totalSongs, icon: MusicNoteIcon, color: '#667eea' },
    { title: 'Total Artists', value: stats.totalArtists, icon: PersonIcon, color: '#764ba2' },
    { title: 'Total Albums', value: stats.totalAlbums, icon: AlbumIcon, color: '#f093fb' },
    { title: 'Total Genres', value: stats.totalGenres, icon: CategoryIcon, color: '#f5576c' },
  ];

  return (
    <Box>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          mb: 3,
          fontWeight: 600,
          color: '#4a5568',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <BarChartIcon sx={{ color: '#667eea' }} />
        Statistics Dashboard
      </Typography>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' }, 
        gap: 3, 
        mb: 4 
      }}>
        {statCards.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Box key={index}>
              <StyledStatCard>
                <CardContent sx={{ textAlign: 'center', py: 3 }}>
                  <Avatar 
                    sx={{ 
                      width: 56, 
                      height: 56, 
                      mx: 'auto', 
                      mb: 2,
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)'
                    }}
                  >
                    <IconComponent sx={{ fontSize: 28, color: '#ffffff' }} />
                  </Avatar>
                  <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 500, mb: 1 }}>
                    {stat.title}
                  </Typography>
                  <Typography variant="h3" sx={{ color: '#ffffff', fontWeight: 700 }}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </StyledStatCard>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
        gap: 3 
      }}>
        <Box>
          <StyledCard>
            <CardContent>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: '#4a5568',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <CategoryIcon sx={{ color: '#667eea' }} />
                Songs per Genre
              </Typography>
              <Divider sx={{ mb: 2, backgroundColor: 'rgba(102, 126, 234, 0.1)' }} />
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#4a5568' }}>Genre</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: '#4a5568' }}>Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.songsPerGenre?.map((item: any, index: number) => (
                      <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(102, 126, 234, 0.05)' } }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, fontSize: 12, backgroundColor: '#667eea' }}>
                              {(item._id || 'U').charAt(0).toUpperCase()}
                            </Avatar>
                            {item._id || 'Unknown'}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={item.count} 
                            size="small" 
                            sx={{ 
                              backgroundColor: 'rgba(102, 126, 234, 0.1)',
                              color: '#667eea',
                              fontWeight: 600
                            }} 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </StyledCard>
        </Box>

        <Box>
          <StyledCard>
            <CardContent>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: '#4a5568',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <PersonIcon sx={{ color: '#764ba2' }} />
                Songs per Artist
              </Typography>
              <Divider sx={{ mb: 2, backgroundColor: 'rgba(118, 75, 162, 0.1)' }} />
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#4a5568' }}>Artist</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: '#4a5568' }}>Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.songsPerArtist?.map((item: any, index: number) => (
                      <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(118, 75, 162, 0.05)' } }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, fontSize: 12, backgroundColor: '#764ba2' }}>
                              {(item._id || 'U').charAt(0).toUpperCase()}
                            </Avatar>
                            {item._id || 'Unknown'}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={item.count} 
                            size="small" 
                            sx={{ 
                              backgroundColor: 'rgba(118, 75, 162, 0.1)',
                              color: '#764ba2',
                              fontWeight: 600
                            }} 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </StyledCard>
        </Box>

        <Box>
          <StyledCard>
            <CardContent>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: '#4a5568',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <AlbumIcon sx={{ color: '#f093fb' }} />
                Songs per Album
              </Typography>
              <Divider sx={{ mb: 2, backgroundColor: 'rgba(240, 147, 251, 0.1)' }} />
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#4a5568' }}>Album</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, color: '#4a5568' }}>Count</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.songsPerAlbum?.map((item: any, index: number) => (
                      <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(240, 147, 251, 0.05)' } }}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Avatar sx={{ width: 24, height: 24, fontSize: 12, backgroundColor: '#f093fb' }}>
                              {(item._id || 'U').charAt(0).toUpperCase()}
                            </Avatar>
                            {item._id || 'Unknown'}
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <Chip 
                            label={item.count} 
                            size="small" 
                            sx={{ 
                              backgroundColor: 'rgba(240, 147, 251, 0.1)',
                              color: '#f093fb',
                              fontWeight: 600
                            }} 
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </StyledCard>
        </Box>
      </Box>
    </Box>
  );
}
