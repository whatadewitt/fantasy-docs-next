import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import LeagueSettings from "../../../../components/Resource/League/Settings";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Settings | League Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <LeagueSettings />
    </Layout>
  );
}
