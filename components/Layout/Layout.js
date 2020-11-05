import Head from "next/head";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import styles from "./Layout.module.scss";

import Nav from "../Nav/Nav";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <Header />

        <div className={styles.wrapper}>
          <Nav />
          <div className={styles.main}>{children}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
