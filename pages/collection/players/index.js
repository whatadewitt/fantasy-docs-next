import Head from "next/head";

import Layout from "../../../components/Layout/Layout";
import Players from "../../../components/Collection/Players/Players";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Players Collection | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <Players />
    </Layout>
  );
}
