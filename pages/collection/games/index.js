import Head from "next/head";

import Layout from "../../../components/Layout/Layout";
import Games from "../../../components/Collection/Games/Games";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Games Collection | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <Games />
    </Layout>
  );
}
