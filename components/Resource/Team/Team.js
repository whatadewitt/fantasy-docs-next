import React from "react";
import Link from "next/link";

import appStyles from "../../Layout/Layout.module.scss";

import cx from "classnames";

const Game = () => (
  <>
    <div>
      <h2>Roster</h2>
      <p>
        The Team APIs allow you to retrieve information about a team within our
        fantasy games. The team is the basic unit for keeping track of a roster
        of players, and can be managed by either one or two managers (the second
        manager being called a co-manager). With the Team APIs, you can obtain
        team-related information, like the team name, managers, logos, stats and
        points, and rosters for particular weeks. Teams only exist in the
        context of a particular League, although you can request a Team Resource
        as the base of your URI by using the global team_key. A user can only
        retrieve data about a team if that team is part of a private league of
        which the user is a member, or if it's in a public league.
      </p>

      <h3>Methods</h3>

      <div className={appStyles.table}>
        <div className={cx(appStyles.header, appStyles.row)}>
          <div>Method</div>
          <div>Description</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/team/meta">team.meta</Link>
          </div>
          <div>Retrieve information about a specific team.</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/team/stats">team.stats</Link>
          </div>
          <div>Retrieve stats and points of a specific team.</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/team/standings">team.standings</Link>
          </div>
          <div>Retrieve a specific teams rank, wins, losses, etc.</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/team/roster">team.roster</Link>
          </div>
          <div>Retrieve the roster of players on a specific team.</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/team/draft_results">team.draft_results</Link>
          </div>
          <div>Retrieve the draft results of a specific team.</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/team/matchups">team.matchups</Link>
          </div>
          <div>Retrieve the matchups of a specific team.</div>
        </div>
      </div>
    </div>
  </>
);

export default Game;
