import Head from "next/head";

import Layout from "../../../components/Layout/Layout";
import Player from "../../../components/Resource/Player/Player";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Player Resource | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <Player />
    </Layout>
  );
}
