import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import RosterFetch from "../../../../components/Resource/Roster/Fetch";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Fetch | Roster Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <RosterFetch />
    </Layout>
  );
}
