import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import RosterPlayers from "../../../../components/Resource/Roster/Players";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Players | Roster Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <RosterPlayers />
    </Layout>
  );
}
