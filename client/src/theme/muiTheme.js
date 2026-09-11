import { createTheme } from '@mui/material/styles';

export const zohoMuiTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0074E4', // Zoho Blue
      light: '#3391ea',
      dark: '#005bb5',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00A859', // Zoho Green
      light: '#33b97a',
      dark: '#008647',
      contrastText: '#ffffff',
    },
    error: {
      main: '#E42528', // Zoho Red
      light: '#e95053',
      dark: '#b61d20',
    },
    warning: {
      main: '#FFB900', // Zoho Yellow/Amber
      light: '#ffc733',
      dark: '#cc9400',
    },
    info: {
      main: '#00B4D8', // Zoho Cyan/Teal
    },
    background: {
      default: '#07111e',
      paper: '#0d1e35',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: '#1b3252',
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', '-apple-system', 'sans-serif'].join(','),
    h4: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 18px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 116, 228, 0.25)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #0074E4 0%, #005bb5 100%)',
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #00A859 0%, #008647 100%)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#0d1e35',
          border: '1px solid #1b3252',
          borderRadius: 16,
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          '&:hover': {
            borderColor: '#244570',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0d1e35',
          border: '1px solid #1b3252',
          borderRadius: 20,
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.6)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
  },
});
