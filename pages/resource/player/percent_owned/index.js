import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import PlayerPercentOwned from "../../../../components/Resource/Player/PercentOwned";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Percent Owned | Player Resource | Yahoo! Fantasy API Node Wrapper by
          Luke DeWitt
        </title>
      </Head>

      <PlayerPercentOwned />
    </Layout>
  );
}
