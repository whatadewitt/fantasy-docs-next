import Head from "next/head";

import Layout from "../../../components/Layout/Layout";
import Transactions from "../../../components/Collection/Transactions/Transactions";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Transactions Collection | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <Transactions />
    </Layout>
  );
}
