import NavBar from "@/layouts/NavBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Oswald } from 'next/font/google';
import { IntlProvider } from 'next-intl';

const oswaldFont = Oswald({
    subsets: ['cyrillic', 'latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-oswald'
});

export default function App({ Component, pageProps }: AppProps) {
    return <IntlProvider messages={pageProps.messages} locale={pageProps.locale}>
        <main className={oswaldFont.variable}>
            <NavBar>
                <Component {...pageProps} />
            </NavBar>
        </main>
    </IntlProvider>;
}
