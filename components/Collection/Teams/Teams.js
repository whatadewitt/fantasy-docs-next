import React from "react";
import Link from "next/link";

import appStyles from "../../Layout/Layout.module.scss";

import cx from "classnames";

const Teams = () => (
  <>
    <div>
      <h2>Teams</h2>
      <p>
        With the Teams Collection API, you can obtain information about a
        collection of teams simultaneously.
      </p>

      <h3>Methods</h3>

      <div className={appStyles.table}>
        <div className={cx(appStyles.header, appStyles.row)}>
          <div>Method</div>
          <div>Description</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/collection/teams/fetch">teams.fetch</Link>
          </div>
          <div>Retrieve information about multiple teams simultaneously</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/collection/teams/leagues">teams.leagues</Link>
          </div>
          <div>
            Retrieve information about multiple teams across multiple leagues
            simultaneously
          </div>
        </div>
        {/* <div className={appStyles.row}>
          <div>
            <Link href="/collection/teams/game">teams.game</Link>
          </div>
          <div>
            Retrieve information about multiple teams across multiple games for
            the logged in user simultaneously
          </div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/collection/teams/user">teams.user</Link>
          </div>
          <div>
            Retrieve information about multiple teams the logged in user
            simultaneously
          </div>
        </div> */}
      </div>
    </div>
  </>
);

export default Teams;
