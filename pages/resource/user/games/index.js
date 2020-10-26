import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import UserGames from "../../../../components/Resource/User/Games";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Games | User Resource | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <UserGames />
    </Layout>
  );
}
