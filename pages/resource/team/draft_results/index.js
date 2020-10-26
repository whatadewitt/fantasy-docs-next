import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import TeamDraftResults from "../../../../components/Resource/Team/DraftResults";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Draft Results | Team Resource | Yahoo! Fantasy API Node Wrapper by
          Luke DeWitt
        </title>
      </Head>

      <TeamDraftResults />
    </Layout>
  );
}
