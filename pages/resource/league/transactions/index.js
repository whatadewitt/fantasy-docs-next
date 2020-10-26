import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import LeagueTransactions from "../../../../components/Resource/League/Transactions";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Transactions | League Resource | Yahoo! Fantasy API Node Wrapper by
          Luke DeWitt
        </title>
      </Head>

      <LeagueTransactions />
    </Layout>
  );
}
