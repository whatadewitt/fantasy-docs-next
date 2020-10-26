import React from "react";
import Link from "next/link";

import appStyles from "../../Layout/Layout.module.scss";

import cx from "classnames";

const User = () => (
  <>
    <div>
      <h2>User</h2>
      <p>
        With the User API, you can obtain fantasy relevant information about a
        specific Yahoo! user who has logged into your application. You can only
        query versus the currently logged in user.
      </p>

      <h3>Methods</h3>

      <div className={appStyles.table}>
        <div className={cx(appStyles.header, appStyles.row)}>
          <div>Method</div>
          <div>Description</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/user/games">user.games</Link>
          </div>
          <div>Retrieve games in which the user has played.</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/user/game_leagues">user.game_leagues</Link>
          </div>
          <div>
            Fetch leagues the user is a participant in one or more games.
          </div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/user/game_teams">user.game_teams</Link>
          </div>
          <div>Fetch teams owned by the user in one or more games.</div>
        </div>
      </div>
    </div>
  </>
);

export default User;
