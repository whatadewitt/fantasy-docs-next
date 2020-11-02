import Head from "next/head";

import Layout from "../../../components/Layout/Layout";
import Teams from "../../../components/Collection/Teams/Teams";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Teams Collection | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <Teams />
    </Layout>
  );
}
