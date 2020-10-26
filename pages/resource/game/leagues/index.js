import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import GameLeagues from "../../../../components/Resource/Game/Leagues";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Leagues | Game Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <GameLeagues />
    </Layout>
  );
}
