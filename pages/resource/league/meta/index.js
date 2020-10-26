import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import LeagueMeta from "../../../../components/Resource/League/Meta";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Meta | League Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <LeagueMeta />
    </Layout>
  );
}
