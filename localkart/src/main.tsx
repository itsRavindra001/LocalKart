// main.tsx
import React from 'react';
import 'leaflet/dist/leaflet.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './Contexts/AuthContext';
import { CartProvider } from './Contexts/CartContext';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import './index.css';

// ✅ Create a custom theme (you can customize colors, typography etc.)
const theme = createTheme({
  palette: {
    mode: 'light', // or "dark"
    primary: {
      main: '#1976d2', // default MUI blue
    },
    secondary: {
      main: '#ff4081',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* ✅ Wrap app inside ThemeProvider */}
          <ThemeProvider theme={theme}>
            <CssBaseline /> {/* ✅ Normalize styles */}
            <App />
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
  