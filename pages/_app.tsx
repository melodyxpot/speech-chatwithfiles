import '@/styles/globals.css';
import '@/styles/pushNotificationStyles.css'
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { Notifications } from "react-push-notification";

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  return (
    <main className={inter.className}>
      {/* <Notifications position="top-right" /> */}
      <Component {...pageProps} />
    </main>
  );
}

export default appWithTranslation(App);
