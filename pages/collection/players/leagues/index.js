import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import PlayersLeague from "../../../../components/Collection/Players/Leagues";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          League | Players Collection | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <PlayersLeague />
    </Layout>
  );
}
