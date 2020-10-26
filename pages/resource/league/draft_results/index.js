import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import LeagueDraftResults from "../../../../components/Resource/League/DraftResults";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Draft Results | League Resource | Yahoo! Fantasy API Node Wrapper by
          Luke DeWitt
        </title>
      </Head>

      <LeagueDraftResults />
    </Layout>
  );
}
