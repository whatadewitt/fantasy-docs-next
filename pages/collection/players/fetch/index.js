import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import PlayersFetch from "../../../../components/Collection/Players/Fetch";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Fetch | Players Collection | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <PlayersFetch />
    </Layout>
  );
}
