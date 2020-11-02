import Head from "next/head";

import Layout from "../../../components/Layout/Layout";
import Leagues from "../../../components/Collection/Leagues/Leagues";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Leagues Collection | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <Leagues />
    </Layout>
  );
}
