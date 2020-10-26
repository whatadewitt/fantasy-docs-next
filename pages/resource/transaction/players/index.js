import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import TransactionPlayers from "../../../../components/Resource/Transaction/Players";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Players | Transaction Resource | Yahoo! Fantasy API Node Wrapper by
          Luke DeWitt
        </title>
      </Head>

      <TransactionPlayers />
    </Layout>
  );
}
