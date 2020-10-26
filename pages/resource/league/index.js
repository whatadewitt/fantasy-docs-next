import Head from "next/head";

import Layout from "../../../components/Layout/Layout";
import League from "../../../components/Resource/League/League";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          League Resource | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <League />
    </Layout>
  );
}
