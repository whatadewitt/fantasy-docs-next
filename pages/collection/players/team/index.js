import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import PlayersTeam from "../../../../components/Collection/Players/Team";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Team | Players Collection | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <PlayersTeam />
    </Layout>
  );
}
