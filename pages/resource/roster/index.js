import Head from "next/head";

import Layout from "../../../components/Layout/Layout";
import Roster from "../../../components/Resource/Roster/Roster";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Roster Resource | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <Roster />
    </Layout>
  );
}
