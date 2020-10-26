import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import LeagueStandings from "../../../../components/Resource/League/Standings";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Standings | League Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <LeagueStandings />
    </Layout>
  );
}
