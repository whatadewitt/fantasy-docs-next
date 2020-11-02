import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import GamesFetch from "../../../../components/Collection/Games/Fetch";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Fetch | Games Collection | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <GamesFetch />
    </Layout>
  );
}
