import React from "react";
import { ServerStyleSheet } from "styled-components";
import Document, { Head, Html, Main, NextScript } from "next/document";

export default function _document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="yandex-verification" content="0a9c7c0835402d24" />

        <link
          rel="icon"
          href="https://universe-sandbox.it-efrem.com/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          href="https://universe-sandbox.it-efrem.com/favicon.ico"
        />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="Universe Sandbox Web" />
        <link
          rel="manifest"
          href="https://universe-sandbox.it-efrem.com/manifest.json"
        />

        <meta name="description" content="Universe Sandbox Web" />
        <meta name="keywords" content="https://universe-sandbox.it-efrem.com" />
        <meta name="author" content="https://universe-sandbox.it-efrem.com" />

        <meta
          id="meta-application-name"
          name="application-name"
          content="Universe Sandbox Web"
        />
        <meta
          id="meta-keywords"
          name="keywords"
          content="Universe Sandbox Web"
        />
        <meta
          id="meta-item-name"
          itemProp="name"
          content="Universe Sandbox Web"
        />
        <meta id="meta-item-image" itemProp="image" content="/logo192.png" />

        <meta
          id="og-title"
          property="og:title"
          content="Universe Sandbox Web"
        />
        <meta id="og-type" property="og:type" content="website" />
        <meta
          id="og-url"
          property="og:url"
          content="https://universe-sandbox.it-efrem.com"
        />
        <meta id="og-image" property="og:image" content="/logo192.png" />
      </Head>

      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

_document.getInitialProps = async (ctx: any) => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => (props: any) =>
          sheet.collectStyles(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};
