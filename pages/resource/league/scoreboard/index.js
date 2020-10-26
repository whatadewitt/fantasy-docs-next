import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import LeagueScoreboard from "../../../../components/Resource/League/Scoreboard";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Scoreboard | League Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <LeagueScoreboard />
    </Layout>
  );
}
