import { useState } from 'react'

import './App.css'

import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
  return (
    <>
        <ThemeProvider theme={theme}>
        <CssBaseline />
    <header>

      <Box>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Theme</button>

      </Box>
    </header>
    </ThemeProvider>
    </>
  )
}

export default App
