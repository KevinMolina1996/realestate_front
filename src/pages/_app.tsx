import Navbar from '@/shared/components/Navbar';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Navbar />
            <main className="mt-6">
                <Component {...pageProps} />
            </main>
        </>
    );
}