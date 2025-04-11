import NavBar from "@/layouts/NavBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Oswald } from 'next/font/google';

const oswaldFont = Oswald({
    subsets: ['cyrillic', 'latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-oswald'
});

export default function App({ Component, pageProps }: AppProps) {
    return <main className={oswaldFont.variable}>
        <NavBar>
            <Component {...pageProps} />
        </NavBar>
    </main>;
}
