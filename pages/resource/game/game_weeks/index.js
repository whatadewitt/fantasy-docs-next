import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import GameWeeks from "../../../../components/Resource/Game/Weeks";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Game Weeks | Game Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <GameWeeks />
    </Layout>
  );
}
