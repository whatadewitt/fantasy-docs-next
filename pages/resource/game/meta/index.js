import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import GameMeta from "../../../../components/Resource/Game/Meta";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Meta | Game Resource | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <GameMeta />
    </Layout>
  );
}
