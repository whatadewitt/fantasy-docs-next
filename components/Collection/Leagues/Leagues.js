import React from "react";
import Link from "next/link";

import appStyles from "../../Layout/Layout.module.scss";

import cx from "classnames";

const Leagues = () => (
  <>
    <div>
      <h2>Leagues</h2>
      <p>
        With the Leagues Collection API, you can obtain the fantasy league
        related information at the same time.
      </p>
      <p>
        To refer to a League resource, you'll need to provide a league_key. The
        league_id is a unique ID identifying a given fantasy league for a given
        season.
      </p>

      <h3>Methods</h3>

      <div className={appStyles.table}>
        <div className={cx(appStyles.header, appStyles.row)}>
          <div>Method</div>
          <div>Description</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/collection/leagues/fetch">leagues.fetch</Link>
          </div>
          <div>Retrieve information about multiple leagues at once</div>
        </div>
      </div>
    </div>
  </>
);

export default Leagues;
