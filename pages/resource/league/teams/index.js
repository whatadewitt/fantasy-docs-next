import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import LeagueTeams from "../../../../components/Resource/League/Teams";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Teams | League Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <LeagueTeams />
    </Layout>
  );
}
