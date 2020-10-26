import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import TeamStats from "../../../../components/Resource/Team/Stats";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Stats | Team Resource | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <TeamStats />
    </Layout>
  );
}
