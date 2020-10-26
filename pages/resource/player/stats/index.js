import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import PlayerStats from "../../../../components/Resource/Player/Stats";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Stats | Player Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <PlayerStats />
    </Layout>
  );
}
