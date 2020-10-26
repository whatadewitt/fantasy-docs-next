import Head from "next/head";

import Layout from "../../../components/Layout/Layout";
import User from "../../../components/Resource/User/User";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          User Resource | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <User />
    </Layout>
  );
}
