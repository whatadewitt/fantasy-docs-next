import Head from "next/head";

import Layout from "../components/Layout/Layout";
import Auth from "../components/Auth/Auth";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Authentication | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <Auth />
    </Layout>
  );
}
