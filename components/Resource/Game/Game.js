import React from "react";
import Link from "next/link";

import appStyles from "../../Layout/Layout.module.scss";

import cx from "classnames";

const Game = () => (
  <>
    <div>
      <h2>Game</h2>
      <p>
        With the Game API, you can obtain the fantasy game related information,
        like the fantasy game name, the Yahoo! game code, and season.
      </p>
      <p>
        To refer to a Game resource, you'll need to provide a game_key, which
        will either be a game_id or game_code. The game_id is a unique ID
        identifying a given fantasy game for a given season. A game_code
        generally identifies a game, independent of season, and, when used as a
        game_key, will typically return the current season of that game. For
        instance, the game_code for the Free NFL game is nfl; using nfl as your
        game_key during the 2014 season would be the same as providing the
        game_id for the 2014 season of the NFL game (331). As of the 2010
        seasons, the Plus and Free games have been combined into a single code.
        If you always want the current season of a game, the game_code should be
        used as a game_key.
      </p>
      <p>
        You can find a list of common game_ids in the{" "}
        <a
          href="https://developer.yahoo.com/fantasysports/guide/#game-resource"
          target="_blank"
          rel="noopener noreferrer"
        >
          official Yahoo! Fantasy Sports documentation for the game resource
        </a>
        .
      </p>

      <h3>Methods</h3>

      <div className={appStyles.table}>
        <div className={cx(appStyles.header, appStyles.row)}>
          <div>Method</div>
          <div>Description</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/game/meta">game.meta</Link>
          </div>
          <div>Retrieve information about a specific game</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/game/leagues">game.leagues</Link>
          </div>
          <div>Retrieve information about league(s) in a specific game</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/game/players">game.players</Link>
          </div>
          <div>Retrieve information about player(s) in a specific game</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/game/game_weeks">game.game_weeks</Link>
          </div>
          <div>Retrieve information about game weeks for a specific game</div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/game/stat_categories">
              game.stat_categories
            </Link>
          </div>
          <div>
            Retrieve information about statistical categories in a specific game
          </div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/game/position_types">
              game.position_types
            </Link>
          </div>
          <div>
            Retrieve information about position types in a specific game
          </div>
        </div>
        <div className={appStyles.row}>
          <div>
            <Link href="/resource/game/roster_positions">
              game.roster_positions
            </Link>
          </div>
          <div>
            Retrieve information about roster positions in a specific game
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Game;
