import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import GamePlayers from "../../../../components/Resource/Game/Players";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Players | Game Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <GamePlayers />
    </Layout>
  );
}
