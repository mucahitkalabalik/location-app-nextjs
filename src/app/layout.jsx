'use client';
import { Provider as UiProvider } from "@/components/ui/provider"; 
import { Provider } from 'react-redux';
import "leaflet/dist/leaflet.css";
import {store} from "@/store";
import Navbar from "@/components/NavBar";
import { ToastContainer } from 'react-toastify';

export default function RootLayout(props = ({ children } = {})) {
  const { children } = props;

  return (
    <html suppressHydrationWarning={true} >
      <body>
        <Provider store={store}> 
          <UiProvider>
            <Navbar />
            {children}
            <ToastContainer />
          </UiProvider>
        </Provider>
      </body>
    </html>
  );
}
