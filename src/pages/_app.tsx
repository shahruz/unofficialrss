import React from 'react';
import type { AppProps } from 'next/app';
import Page from 'src/app/layouts/Page';

function UnofficialRSS({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}

export default UnofficialRSS;
