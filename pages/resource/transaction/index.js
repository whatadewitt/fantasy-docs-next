import Head from "next/head";

import Layout from "../../../components/Layout/Layout";
import Transaction from "../../../components/Resource/Transaction/Transaction";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Transaction Resource | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <Transaction />
    </Layout>
  );
}
