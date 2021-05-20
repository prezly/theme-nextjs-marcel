import 'intersection-observer';

import { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/slate-override.css';

function MyApp({ Component, pageProps }: AppProps) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...pageProps} />;
}

export default MyApp;
