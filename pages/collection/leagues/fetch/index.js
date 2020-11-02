import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import LeaguesFetch from "../../../../components/Collection/Leagues/Fetch";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Fetch | Leagues Collection | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <LeaguesFetch />
    </Layout>
  );
}
