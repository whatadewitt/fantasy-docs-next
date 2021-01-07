import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import TeamsLeague from "../../../../components/Collection/Teams/League";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          League | Teams Collection | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <TeamsLeague />
    </Layout>
  );
}
