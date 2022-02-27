import { useState } from "react";

import Head from "next/head";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Nav from "../Nav/Nav";

import styles from "./Layout.module.scss";
import cx from "classnames";

export default function Layout({ children }) {
  const [showNav, toggleNav] = useState(false);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,500;0,700;0,900;1,300;1,700&display=swap" rel="stylesheet" />

        <meta property="og:image" content="/open-graph.png" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-01MY5QQ3HP"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-01MY5QQ3HP');`,
          }}
        />
      </Head>

      <div className={styles.container}>
        <Header
          toggleNav={() => {
            toggleNav(!showNav);
          }}
        />

        <div className={styles.wrapper}>
          <Nav show={showNav} />
          <div
            className={cx(styles.main, {
              [styles.navToggled]: showNav,
            })}
          >
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
