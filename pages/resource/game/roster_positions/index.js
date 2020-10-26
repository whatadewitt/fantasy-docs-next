import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import GameRosterPositions from "../../../../components/Resource/Game/RosterPositions";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Roster Positions | Game Resource | Yahoo! Fantasy API Node Wrapper by
          Luke DeWitt
        </title>
      </Head>

      <GameRosterPositions />
    </Layout>
  );
}
