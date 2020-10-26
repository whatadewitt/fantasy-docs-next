import Head from "next/head";

import Layout from "../../../components/Layout/Layout";
import Team from "../../../components/Resource/Team/Team";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Team Resource | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <Team />
    </Layout>
  );
}
