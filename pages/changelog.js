import Head from "next/head";

import Layout from "../components/Layout/Layout";
import Changelog from "../components/Changelog/Changelog";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Changelog | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <Changelog />
    </Layout>
  );
}
