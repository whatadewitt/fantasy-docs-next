import React from "react";
import Link from "next/link";

import appStyles from "../../Layout/Layout.module.scss";

import cx from "classnames";

const League = () => (
  <>
    <div>
      <h2>League</h2>
      <p>
        With the League API, you can obtain the league related information, like
        the league name, the number of teams, the draft status, etc.
      </p>
      <p>
        Leagues only exist in the context of a particular Game, although you can
        request a League Resource as the base of your URI by using the global
        league_key.
      </p>
      <p>
        Users can only retrieve data for private leagues of which they are a
        member if they have provided a valid OAuthToken upon authenticating your
        application. Leagues that have been designated as public can be queried
        without user authentication.
      </p>

      <h3>Methods</h3>

      <div className={appStyles.table}>
        <div className={cx(appStyles.header, appStyles.row)}>
          <div>Method</div>
          <div>Description</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/league/meta">league.meta</Link>
          </div>
          <div>Retrieve information about a specific league</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/league/settings">league.settings</Link>
          </div>
          <div>
            Retrieve information about the settings of a specific league
          </div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/league/scoreboard">league.scoreboard</Link>
          </div>
          <div>
            Retrieve the scoreboard from a specific league for a given week
          </div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/leagueg/teams">league.teams</Link>
          </div>
          <div>Retrieve information about the teams in a specific league</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/league/players">league.players</Link>
          </div>
          <div>Retrieve information about players in a specific league</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/league/draft_results">
              league.draft_results
            </Link>
          </div>
          <div>Retrieve draft results from a specific league</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/league/transactions">
              league.transactions
            </Link>
          </div>
          <div>
            Retrieve information about transactions in a specific league
          </div>
        </div>
      </div>
    </div>
  </>
);

export default League;
