'use client';
import { Provider as UiProvider } from "@/components/ui/provider"; 
import { Provider } from 'react-redux';
import "leaflet/dist/leaflet.css";
import { store } from "@/store";
import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ToastContainer } from 'react-toastify';
import { Box } from '@chakra-ui/react';

export default function RootLayout(props = ({ children } = {})) {
  const { children } = props;

  return (
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
        </Provider>
      </body>
    </html>
  );
}
