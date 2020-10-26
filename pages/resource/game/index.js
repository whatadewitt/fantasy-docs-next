import Head from "next/head";

import Layout from "../../../components/Layout/Layout";
import Game from "../../../components/Resource/Game/Game";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Game Resource | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <Game />
    </Layout>
  );
}
