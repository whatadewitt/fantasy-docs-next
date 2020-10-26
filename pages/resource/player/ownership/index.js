import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import PlayerOwnership from "../../../../components/Resource/Player/Ownership";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Ownership | Player Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <PlayerOwnership />
    </Layout>
  );
}
