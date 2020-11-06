import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import UserGameTeams from "../../../../components/Resource/User/GameTeams";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Game Teams | User Resource | Yahoo! Fantasy API Node Wrapper by Luke
          DeWitt
        </title>
      </Head>

      <UserGameTeams />
    </Layout>
  );
}
