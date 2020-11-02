import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import TeamsFetch from "../../../../components/Collection/Teams/Fetch";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Fetch | Teams Collection | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <TeamsFetch />
    </Layout>
  );
}
