import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import GamesUser from "../../../../components/Collection/Games/User";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          User | Games Collection | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <GamesUser />
    </Layout>
  );
}
