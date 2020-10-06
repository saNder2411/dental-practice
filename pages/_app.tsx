import { FC } from 'react';
import { AppProps } from 'next/app';
import NextNprogress from 'nextjs-progressbar';

import '../styles/globals.css';
import 'antd/dist/antd.css';

const App: FC<AppProps> = ({ Component, pageProps }): JSX.Element => {
  return (
    <>
      <NextNprogress color="#29D" startPosition={0.3} stopDelayMs={200} height={5} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
