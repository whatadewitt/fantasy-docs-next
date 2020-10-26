import Head from "next/head";

import Layout from "../../../../components/Layout/Layout";
import TeamMeta from "../../../../components/Resource/Team/Meta";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>
          Meta | Team Resource | Yahoo! Fantasy API Node Wrapper by Luke DeWitt
        </title>
      </Head>

      <TeamMeta />
    </Layout>
  );
}
