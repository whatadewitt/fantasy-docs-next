import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import GameStatCategories from "../../../../components/Resource/Game/StatCategories";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Stat Categories | Game Resource | Yahoo! Fantasy API Node Wrapper by
          Luke DeWitt
        </title>
      </Head>

      <GameStatCategories />
    </Layout>
  );
}
