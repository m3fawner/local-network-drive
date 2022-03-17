import {
  Html, Head, Main, NextScript,
} from 'next/document';

const Document = () => (
  <Html>
    <Head>
      <meta name="application-name" content="Local Network Drive" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Local Network Drive" />
      <meta name="description" content="Gives you the ability to access a local network drive via a progressive web app without ever hitting the internet" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content="#3482F6" />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content="#3482F6" />

      <link rel="apple-touch-icon" href="/files.svg" />

      <link rel="icon" type="image/svg" sizes="32x32" href="/files.svg" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="shortcut icon" href="/files.svg" />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="Local Network Drive" />
      <meta property="og:description" content="Gives you the ability to access a local network drive via a progressive web app without ever hitting the internet" />
      <meta property="og:site_name" content="Local Network Drive" />
      <meta property="og:url" content="http://192.168.29.181" />
      <meta property="og:image" content="http://192168.29.181/files.svg" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
