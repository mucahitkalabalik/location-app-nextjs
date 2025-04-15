'use client';
import { Provider as UiProvider } from "@/components/ui/provider";  // İsminde değişiklik yapıldı
import { Provider } from 'react-redux';
import "leaflet/dist/leaflet.css";
import {store} from "@/store";

export default function RootLayout(props = ({ children } = {})) {
  const { children } = props;

  return (
    <html suppressHydrationWarning>
      <body>
        <Provider store={store}>  {/* Redux Provider */}
          <UiProvider>  {/* UI Provider */}
            {children}
          </UiProvider>
        </Provider>
      </body>
    </html>
  );
}
