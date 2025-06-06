import Document, { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { AppConfig } from '../utils/AppConfig';

class MyDocument extends Document {
  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <Html lang={AppConfig.locale}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Sriracha&display=swap"
            rel="stylesheet"
          />
          <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-XERKRD63S0"
          ></Script>
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XERKRD63S0');
            `}
          </Script>
          <Script
            src="https://apis.google.com/js/platform.js"
            async
            defer
          ></Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
