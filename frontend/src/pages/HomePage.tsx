import { Container, Typography, Box, Paper, Fade } from "@mui/material";
import { styled } from "@mui/material/styles";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import SongForm from "../components/SongForm";
import SongsList from "../components/SongsList";
import StatsPanel from "../components/StatsPanel";

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  padding: theme.spacing(4, 2),
}));

const HeaderSection = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  textAlign: 'center',
}));

const ContentSection = styled(Box)(({ theme }) => ({
  '& > *': {
    marginBottom: theme.spacing(4),
  },
}));

export default function HomePage() {
  return (
    <StyledContainer maxWidth="lg">
      <Fade in timeout={800}>
        <HeaderSection elevation={0}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
            <MusicNoteIcon sx={{ fontSize: 48, color: '#667eea', mr: 2 }} />
            <Typography 
              variant="h3" 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              addis music
            </Typography>
          </Box>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ fontWeight: 400 }}
          >
            Manage your music collection with style
          </Typography>
        </HeaderSection>
      </Fade>

      <ContentSection>
        <Fade in timeout={1000} style={{ transitionDelay: '200ms' }}>
          <Box>
            <SongForm />
          </Box>
        </Fade>

        <Fade in timeout={1000} style={{ transitionDelay: '400ms' }}>
          <Box>
            <SongsList />
          </Box>
        </Fade>

        <Fade in timeout={1000} style={{ transitionDelay: '600ms' }}>
          <Box>
            <StatsPanel />
          </Box>
        </Fade>
      </ContentSection>
    </StyledContainer>
  );
}
