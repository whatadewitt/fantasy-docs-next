import React from "react";
import Link from "next/link";

import appStyles from "../../Layout/Layout.module.scss";

import cx from "classnames";

const Player = () => (
  <>
    <div>
      <h2>Player</h2>
      <p>
        With the Player API, you can obtain player (athlete) related
        information, such as their name, professional team, eligible positions,
        and more.
      </p>
      <p>Players are identified in the context of a particular game.</p>

      <h3>Methods</h3>

      <div className={appStyles.table}>
        <div className={cx(appStyles.header, appStyles.row)}>
          <div>Method</div>
          <div>Description</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/player/meta">player.meta</Link>
          </div>
          <div>Retrieve information about a specific player</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/player/stats">player.stats</Link>
          </div>
          <div>Retrieve the stats of a specific player</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/player/ownership">player.ownership</Link>
          </div>
          <div>
            Retrieve ownership information about a player in a given league
          </div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/player/percent_owned">
              player.percent_owned
            </Link>
          </div>
          <div>
            Retrieve information about the players ownership across the Yahoo!
            Fantasy ecosystem
          </div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/player/draft_analysis">
              player.draft_analysis
            </Link>
          </div>
          <div>
            Retrieve draft analysis (pick #, round #, % drafted) about a
            specific player
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Player;
