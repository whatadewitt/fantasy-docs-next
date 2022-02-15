import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import PlayersTeam from "../../../../components/Collection/Players/Teams";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Teams | Players Collection | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <PlayersTeam />
    </Layout>
  );
}
