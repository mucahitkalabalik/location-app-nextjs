'use client';
import { Provider } from 'react-redux';
import "leaflet/dist/leaflet.css";
import 'react-toastify/dist/ReactToastify.css';
import { store } from "@/store";
import Navbar from "@/components/NavBar";
import { ToastContainer } from 'react-toastify';
import { ChakraProvider } from '@chakra-ui/react';

// Simple theme configuration instead of extendTheme
const theme = {
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  colors: {
    brand: {
      50: '#E6FFFA',
      100: '#B2F5EA',
      200: '#81E6D9',
      300: '#4FD1C5',
      400: '#38B2AC',
      500: '#319795',
      600: '#2C7A7B',
      700: '#285E61',
      800: '#234E52',
      900: '#1D4044',
    },
  },
};

/**
 * Root layout component for the application
 */
export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="tr">
      <head>
        <title>Location App</title>
        <meta name="description" content="An app to manage and track locations" />
      </head>
      <body>
        <Provider store={store}> 
          <ChakraProvider>
            <Navbar />
            <main>
              {children}
            </main>
            <ToastContainer
              position="bottom-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </ChakraProvider>
        </Provider>
      </body>
    </html>
  );
}
