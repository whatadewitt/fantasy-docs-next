import Head from "next/head";
import { useEffect, useContext } from "react";

import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";

import appStyles from "../../components/Layout/Layout.module.scss";
import cx from "classnames";

import { Context } from "../../context";
import { USER_LOG_IN } from "../../reducers/user";

export default function Main() {
  const { query, replace } = useRouter();
  // const [err, ]
  const { dispatch } = useContext(Context);

  useEffect(() => {
    console.log(query);
    if (query.code) {
      fetch(`/api/auth/callback?code=${query.code}`)
        .then((data) => data.json())
        .then(({ user: { name, id, avatar } }) => {
          dispatch({
            type: USER_LOG_IN,
            payload: {
              id,
              name,
              avatar,
            },
          });

          replace(query.state);
        });
      // .catch(err => data.push("/error"))
    }
    // else {
    //   console.log("HIT");
    //   return push("/error");
    // }
  }, [query]);

  return (
    <Layout>
      <Head>
        <title>Processing</title>
      </Head>

      <div
        className={cx(
          appStyles.spinner,
          appStyles.spinnerDark,
          appStyles.center
        )}
      >
        <div className={appStyles.bounce1}></div>
        <div className={appStyles.bounce2}></div>
        <div className={appStyles.bounce3}></div>
      </div>
    </Layout>
  );
}
