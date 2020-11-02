import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import TransactionsFetch from "../../../../components/Collection/Transactions/Fetch";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Fetch | Transactions Collection | Yahoo! Fantasy API Node Wrapper by
          Luke DeWitt
        </title>
      </Head>

      <TransactionsFetch />
    </Layout>
  );
}
