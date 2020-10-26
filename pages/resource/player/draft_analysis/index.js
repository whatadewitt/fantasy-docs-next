import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import PlayerDraftAnalysis from "../../../../components/Resource/Player/DraftAnalysis";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Draft Analysis | Player Resource | Yahoo! Fantasy API Node Wrapper by
          Luke DeWitt
        </title>
      </Head>

      <PlayerDraftAnalysis />
    </Layout>
  );
}
