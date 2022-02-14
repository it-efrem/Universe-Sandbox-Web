import Head from "next/head";
import React from "react";

import { App } from "src/components/App/App";
import { StyleGlobalReset } from "src/styles/StyleGlobalReset";

export default function IndexPage() {
  return (
    <React.StrictMode>
      <Head>
        <title>Universe Sandbox Web</title>
      </Head>

      <StyleGlobalReset />
      <App />
    </React.StrictMode>
  );
}
