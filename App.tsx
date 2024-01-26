import { StatusBar } from 'react-native';
import { ThemeProvider } from '@shopify/restyle';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'

import { theme } from './src/theme';

import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContext';

export default function App() {
  const [ fontsLoader ] = useFonts({Roboto_400Regular, Roboto_700Bold})
  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle='light-content'  
        backgroundColor='transparent'
        translucent
      />

      <AuthContextProvider>
        {fontsLoader && <Routes /> }
      </AuthContextProvider>

    </ThemeProvider>
  );
}
