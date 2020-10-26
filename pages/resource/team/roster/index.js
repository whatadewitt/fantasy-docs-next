import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import TeamRoster from "../../../../components/Resource/Team/Roster";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Roster | Team Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <TeamRoster />
    </Layout>
  );
}
