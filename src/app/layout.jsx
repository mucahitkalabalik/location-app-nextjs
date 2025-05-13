'use client';
import { Provider } from 'react-redux';
import "leaflet/dist/leaflet.css";
<<<<<<< HEAD
import 'react-toastify/dist/ReactToastify.css';
=======
>>>>>>> afe52571f3f6ef6cd3424411cd8517c3c42e43e9
import { store } from "@/store";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
<<<<<<< HEAD
import { ChakraProvider } from '@chakra-ui/react';
=======
import { Box } from '@chakra-ui/react';
>>>>>>> afe52571f3f6ef6cd3424411cd8517c3c42e43e9

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
<<<<<<< HEAD
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
=======
    <html suppressHydrationWarning={true}>
      <body>
        <Provider store={store}> 
          <UiProvider>
            {/* Navbar */}
            <Box h="10vh">
              <Navbar />
            </Box>

            {/* Body */}
            <Box h="80vh" overflowY="auto">
              {children}
            </Box>
              <Box>
              <Footer />
            </Box>
           

            <ToastContainer />
          </UiProvider>
>>>>>>> afe52571f3f6ef6cd3424411cd8517c3c42e43e9
        </Provider>
      </body>
    </html>
  );
}
