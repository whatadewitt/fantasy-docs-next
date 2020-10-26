import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import TeamStandings from "../../../../components/Resource/Team/Standings";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Standings | Team Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <TeamStandings />
    </Layout>
  );
}
