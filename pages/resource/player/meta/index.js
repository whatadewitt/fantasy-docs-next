import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import PlayerMeta from "../../../../components/Resource/Player/Meta";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Meta | Player Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <PlayerMeta />
    </Layout>
  );
}
