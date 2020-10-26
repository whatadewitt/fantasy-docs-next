import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import TeamMatchups from "../../../../components/Resource/Team/Matchups";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Matchups | Team Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <TeamMatchups />
    </Layout>
  );
}
