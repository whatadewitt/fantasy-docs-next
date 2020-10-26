import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import LeaguePlayers from "../../../../components/Resource/League/Players";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Players | League Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <LeaguePlayers />
    </Layout>
  );
}
