import { createTheme } from '@mui/material/styles';

const queryKoalaTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2c3e50', // Dark blue from koala outline
      light: '#4a6741',
      dark: '#1a252f',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#4caf50', // Green from "Koala" text
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#4caf50',
    },
    grey: {
      50: '#f8f9fa',
      100: '#e9ecef',
      200: '#b8c5d1', // Light blue-gray from koala body
      300: '#9ba8b5',
      400: '#7e8b99',
      500: '#6c757d',
      600: '#495057',
      700: '#343a40',
      800: '#212529',
      900: '#1a1d20',
    },
    info: {
      main: '#17a2b8',
      light: '#58d3e8',
      dark: '#0d6efd',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#2e7d32',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    error: {
      main: '#f44336',
      light: '#ef5350',
      dark: '#d32f2f',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      color: '#2c3e50',
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
      color: '#2c3e50',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      color: '#2c3e50',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      color: '#2c3e50',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      color: '#2c3e50',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.125rem',
      color: '#2c3e50',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: '#2c3e50',
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: '#495057',
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.875rem',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(44, 62, 80, 0.08)',
    '0px 4px 8px rgba(44, 62, 80, 0.12)',
    '0px 8px 16px rgba(44, 62, 80, 0.16)',
    '0px 12px 24px rgba(44, 62, 80, 0.20)',
    '0px 16px 32px rgba(44, 62, 80, 0.24)',
    '0px 20px 40px rgba(44, 62, 80, 0.28)',
    '0px 24px 48px rgba(44, 62, 80, 0.32)',
    '0px 32px 64px rgba(44, 62, 80, 0.36)',
    '0px 40px 80px rgba(44, 62, 80, 0.40)',
    '0px 48px 96px rgba(44, 62, 80, 0.44)',
    '0px 56px 112px rgba(44, 62, 80, 0.48)',
    '0px 64px 128px rgba(44, 62, 80, 0.52)',
    '0px 72px 144px rgba(44, 62, 80, 0.56)',
    '0px 80px 160px rgba(44, 62, 80, 0.60)',
    '0px 88px 176px rgba(44, 62, 80, 0.64)',
    '0px 96px 192px rgba(44, 62, 80, 0.68)',
    '0px 104px 208px rgba(44, 62, 80, 0.72)',
    '0px 112px 224px rgba(44, 62, 80, 0.76)',
    '0px 120px 240px rgba(44, 62, 80, 0.80)',
    '0px 128px 256px rgba(44, 62, 80, 0.84)',
    '0px 136px 272px rgba(44, 62, 80, 0.88)',
    '0px 144px 288px rgba(44, 62, 80, 0.92)',
    '0px 152px 304px rgba(44, 62, 80, 0.96)',
    '0px 160px 320px rgba(44, 62, 80, 1.00)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0px 4px 8px rgba(44, 62, 80, 0.12)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1a252f 0%, #2c3e50 100%)',
          },
        },
        containedSecondary: {
          background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #388e3c 0%, #4caf50 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 4px 16px rgba(44, 62, 80, 0.08)',
          border: '1px solid rgba(44, 62, 80, 0.06)',
          '&:hover': {
            boxShadow: '0px 8px 24px rgba(44, 62, 80, 0.12)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4caf50',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#4caf50',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#4caf50',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: '#2c3e50',
          color: '#ffffff',
        },
        colorSecondary: {
          backgroundColor: '#4caf50',
          color: '#ffffff',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#2c3e50',
          boxShadow: '0px 2px 8px rgba(44, 62, 80, 0.08)',
          border: 'none',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          color: '#6c757d',
          '&.Mui-selected': {
            color: '#4caf50',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#4caf50',
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: '1px solid rgba(44, 62, 80, 0.08)',
          boxShadow: '4px 0px 16px rgba(44, 62, 80, 0.08)',
        },
        paperAnchorLeft: {
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
        },
        paperAnchorRight: {
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16,
        },
        paperAnchorTop: {
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
        },
        paperAnchorBottom: {
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '4px 8px',
          '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(76, 175, 80, 0.12)',
            color: '#4caf50',
            '&:hover': {
              backgroundColor: 'rgba(76, 175, 80, 0.16)',
            },
            '& .MuiListItemIcon-root': {
              color: '#4caf50',
            },
            '& .MuiListItemText-primary': {
              fontWeight: 600,
              color: '#4caf50',
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: '4px 8px',
          '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.08)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(76, 175, 80, 0.12)',
            color: '#4caf50',
            '&:hover': {
              backgroundColor: 'rgba(76, 175, 80, 0.16)',
            },
            '& .MuiListItemIcon-root': {
              color: '#4caf50',
            },
            '& .MuiListItemText-primary': {
              fontWeight: 600,
              color: '#4caf50',
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: '#6c757d',
          minWidth: 40,
          '&.Mui-selected': {
            color: '#4caf50',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#2c3e50',
        },
        secondary: {
          fontSize: '0.75rem',
          color: '#6c757d',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(44, 62, 80, 0.08)',
          margin: '8px 16px',
        },
      },
    },
    
  },
});

export default queryKoalaTheme;