import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import UserGameLeagues from "../../../../components/Resource/User/GameLeagues";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Game Leagues | User Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <UserGameLeagues />
    </Layout>
  );
}
