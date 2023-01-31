import React from "react";

const Changelog = () => {
  return (
    <>
      <h2>Changelog</h2>
      <h4>5.2.0</h4>
      <ul>
        <li>
          Add support for `lastweek` and `lastmonth` as arguments in
          `player.stats` resource (Thanks to{" "}
          <a
            href="https://github.com/nosecreek"
            target="_blank"
            rel="noopener noreferrer"
          >
            nosecreek
          </a>
          !)
        </li>
      </ul>
      <h4>5.1.0</h4>
      <ul>
        <li>
          Cleaned up the user.game_leagues function to have the game.league
          array be an array of objects instead of an array of a single array
          holding an object (which was just weird and bad).
        </li>
      </ul>
      <h4>5.0.0</h4>
      <ul>
        <li>
          My NextJS docs site was giving me grief about ESM/CJS imports so I
          made some changes that should work for whatever import method you want
          to use
        </li>
        <li>
          Updated the `mapScoreboard` function that is used by the league
          resource to simplify the `stat_winners` array to show the winning
          `stat_id` and `team_key` (or `is_tied`), rather than having them
          nested inside a `stat_winner` object
        </li>
      </ul>
      <h4>4.2.0</h4>
      <ul>
        <li>
          Fixed a bug where querying player stats for a given week wasn't
          working.
        </li>
        <li>
          Updated the `player.stats` function to accept a week OR a date (format
          `yyyy-mm-dd`) as the 2nd param
        </li>
        <li>
          Fixed a bug that would cause the function to fail silently if trying
          to request stats for a given `week` for players outside of the NFL
          (for this you can just get the weeks from the game settings and make
          multiple queries for each day of the week).
        </li>
        <li>
          Fixes{" "}
          <a
            href="https://github.com/whatadewitt/yahoo-fantasy-sports-api/issues/79"
            target="_blank"
            rel="noopener noreferrer"
          >
            Issue #79
          </a>{" "}
          (Big thanks to{" "}
          <a
            href="https://github.com/jimweigandt"
            target="_blank"
            rel="noopener noreferrer"
          >
            jimweigandt
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/rdbaron"
            target="_blank"
            rel="noopener noreferrer"
          >
            rdbaron
          </a>{" "}
          for the help finding / debugging the issue)
        </li>
      </ul>
      <h4>4.1.5</h4>
      <ul>
        <li>
          Fixed a bug where certain league settings were not loading properly
          for some older leagues. (merge{" "}
          <a
            href="https://github.com/whatadewitt/yahoo-fantasy-sports-api/pull/80"
            target="_blank"
            rel="noopener noreferrer"
          >
            PR #80
          </a>
          (Thanks{" "}
          <a
            href="https://github.com/connor4312"
            target="_blank"
            rel="noopener noreferrer"
          >
            connor4312
          </a>
          !)
        </li>
      </ul>
      <h4>4.1.4</h4>
      <ul>
        <li>
          Fixed a bug where the response from the token refresh was not being
          included in the promise chain. (merge{" "}
          <a
            href="https://github.com/whatadewitt/yahoo-fantasy-sports-api/pull/78"
            target="_blank"
            rel="noopener noreferrer"
          >
            PR #78
          </a>
          ) (Thanks{" "}
          <a
            href="https://github.com/connor4312"
            target="_blank"
            rel="noopener noreferrer"
          >
            connor4312
          </a>
          !)
        </li>
      </ul>
      <h4>4.1.3</h4>
      <ul>
        <li>
          Fixed a bug where Yahoo! apparently no longer requires `;type=week`
          when building a URL for team.stats and player.stats, leading to no
          stats coming back for those resources (
          <a
            href="https://github.com/whatadewitt/yahoo-fantasy-sports-api/issues/70"
            target="_blank"
            rel="noopener noreferrer"
          >
            Issue #70
          </a>
          )
        </li>
      </ul>
      <h4>4.1.2</h4>
      <ul>
        <li>
          Fixed bug where "selected position" was no longer working due to a
          change in the data format coming from Yahoo! (merge{" "}
          <a
            href="https://github.com/whatadewitt/yahoo-fantasy-sports-api/pull/69"
            target="_blank"
            rel="noopener noreferrer"
          >
            PR #69
          </a>
          ) (Thanks{" "}
          <a
            href="https://github.com/brisberg"
            target="_blank"
            rel="noopener noreferrer"
          >
            brisberg
          </a>
          )
        </li>
      </ul>
      <h4>4.1.1</h4>
      <ul>
        <li>
          Small change to the way the resource and collection files are being
          imported as it was causing issues on some hosts...
        </li>
      </ul>
      <h4>4.1.0</h4>
      <ul>
        <li>
          Maybe would have made sense as a 5.0.0 as there may be breaking
          changes, but I haven't been able to find any yet...
        </li>
        <li>
          the authCallback() function will now return an object with the user's
          access_token and refresh_token
        </li>
        <li>
          the auth() function will accept a "state" string, allowing for state
          persistence through the authentication process
        </li>
        <li>re-enabled the transactions.fetch() collection call</li>
        <li>
          cleaned up the "wavier_days" and "stat_categories" objects on league
          resources
        </li>
        <li>
          added deprecation warnings to the game.leagues and game.players
          functions as they're not very useful in that context
        </li>
      </ul>
      <h4>4.0.0</h4>
      <ul>
        <li>
          Added auth(), authCallback, setRefreshToken() functions to the library
        </li>
        <li>
          Automatically handle refreshing of the token and call a user defined
          function when the token has expired
        </li>
        <li>Added support for public queries</li>
        <li>General cleanup</li>
      </ul>
      <h4>3.2.0</h4>
      <ul>
        <li>
          Added "players" subresource to "league" in order to obtain weekly /
          season stats for a player based on league settings
        </li>
        <li>
          Fixed a bug where the starting status wasn't properly being returned
          due to a shift in how the data was being returned
        </li>
        <li>
          Removed use of "request" library for size and performance reasons
        </li>
        <li>General code optimizations and improvements</li>
      </ul>
      <h4>3.1.2</h4>
      <ul>
        <li>Updating dependencies</li>
      </ul>
      <h4>3.1.1</h4>
      <ul>
        <li>
          Resolve error when no team logo is present (fix{" "}
          <a
            href="https://github.com/whatadewitt/yfsapi/issues/42"
            target="_blank"
            rel="noopener noreferrer"
          >
            Issue #42
          </a>
          )
        </li>
      </ul>
      <h4>3.1.0</h4>
      <ul>
        <li>
          Introduced `promise` based flow for all endpoints as an alternative to
          callbacks. (Thanks{" "}
          <a
            href="https://github.com/ryus08"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marois
          </a>
          )
        </li>
        <li>Will update the sandbox here to show that flow as time allows! </li>
      </ul>
      <h4>3.0.4</h4>
      <ul>
        <li>
          Fixed a bug in the players.league collection call where it was trying
          to use split on an array... (
          <a
            href="https://github.com/whatadewitt/yfsapi/pull/46"
            target="_blank"
            rel="noopener noreferrer"
          >
            Issue #46
          </a>
          )
        </li>
      </ul>
      <h4>3.0.3</h4>
      <ul>
        <li>
          Added the ability to specify a date or week when querying the{" "}
          <a href="/resource/user/game_leagues">team.stats</a> resource.
        </li>
        <li>
          Unit test fixes (
          <a
            href="https://github.com/whatadewitt/yfsapi/pull/42"
            target="_blank"
            rel="noopener noreferrer"
          >
            Issue #42
          </a>
          ). Thanks{" "}
          <a
            href="https://github.com/ryus08"
            target="_blank"
            rel="noopener noreferrer"
          >
            Marios
          </a>
          !
        </li>
        <li>Updated "vulnerable" dependencies.</li>
      </ul>
      <h4>3.0.2</h4>
      <ul>
        <li>
          Fixed an issue with{" "}
          <a href="/resource/user/game_leagues">user.game_leagues</a> resource,
          where the data was not at all user friendly (renamed "leagues" to
          "games" at the top level of the return object)
        </li>
      </ul>
      <h4>3.0.1</h4>
      <ul>
        <li>
          Fixed some typos in some import statements which caused issues on some
          servers
        </li>
      </ul>
      <h4>3.0.0</h4>
      <ul>
        <li>
          Major refactor to use ES6?... 2015? ...2018? Whatever the hell they're
          calling it now...
        </li>
        <li>Using ES Modules (mjs) files where possible</li>
        <li>Removed transactions collections (they'll be back!)</li>
      </ul>
      <h4>2.0.4</h4>
      <ul>
        <li>
          {" "}
          Added a fix to give a cleaner value for the new "batting order"
          attribute in the player oject.
        </li>
      </ul>
      <h4>2.0.3</h4>
      <ul>
        <li>
          Fixed a bug where the league players collection was not properly
          parsing the ownership subresource
        </li>
      </ul>
      <h4>2.0.2</h4>
      <ul>
        <li>
          Fixed a bug where "mapTeamPoints" helper function was not defining
          "self". Thanks{" "}
          <a
            href="https://github.com/platky"
            target="_blank"
            rel="noopener noreferrer"
          >
            platky
          </a>
          !
        </li>
      </ul>
      <h4>2.0.1</h4>
      <ul>
        <li>
          Removed the code that added a "reason" to errors coming from Yahoo! as
          it was breaking other errors. Retry notifications should now be
          handled within the application using the module.
        </li>
      </ul>
      <h4>2.0.0</h4>
      <ul>
        <li>Moved to Yahoo!'s OAuth2.0 authentication mechanism.</li>
      </ul>
      <h4>1.0.2</h4>
      <ul>
        {" "}
        <li> Fixed game resource roster postions callback bug.</li>
      </ul>
      <h4>1.0.1</h4>
      <ul>
        {" "}
        <li> Fixed a typo that was breaking team mapping.</li>
      </ul>
      <h4>1.0.0</h4>
      <ul>
        <li>Breaking changes</li>
        <li>
          Fixed NFL scoreboard/matchups bug (
          <a
            href="https://github.com/whatadewitt/yfsapi/issues/19"
            target="_blank"
            rel="noopener noreferrer"
          >
            Issue #19
          </a>
          )
        </li>
        <li>
          In fixing this bug I realized that my "team" set up was really only
          useful for MLB fantasy, so I rewrote team mapping to work better
          across all sports and give additional details that weren't previously
          reported. This will cause errors if you are using the team.manager
          attribute in your code.
        </li>
      </ul>
      <h4>0.5.3</h4>
      <ul>
        <li>
          Fixed a bug where leagueFetch was throwing an error, thanks{" "}
          <a
            href="https://github.com/danielspector"
            target="_blank"
            rel="noopener noreferrer"
          >
            danielspector
          </a>
          !
        </li>
      </ul>
      <h4>0.5.2</h4>
      <ul>
        <li>
          Fixed a bug where player stats by week url was not being created
          properly, thanks{" "}
          <a
            href="https://github.com/withsmilo"
            target="_blank"
            rel="noopener noreferrer"
          >
            withsmilo
          </a>
          !
        </li>
      </ul>
      <h4>0.5.1</h4>
      <ul>
        <li>
          Fixed a bug where collections that contained subresources would return
          no data.
        </li>
      </ul>
      <h4>0.5.0</h4>
      <ul>
        <li>
          Added "Transactions" collection with functionality to add players,
          drop players, and add/drop players, thanks again
          [githubsmilo](https://github.com/githubsmilo)!
        </li>
      </ul>
      <h4>0.4.4</h4>
      <ul>
        <li>
          Fixed a bug in player.draft_analysis, thanks{" "}
          <a
            href="https://github.com/githubsmilo"
            target="_blank"
            rel="noopener noreferrer"
          >
            githubsmilo
          </a>
          !
        </li>
      </ul>
      <h4>0.4.3</h4>
      <ul>
        <li>Added weeks param for league.scoreboard</li>
        <li>Added weeks param for team.matchups</li>
        <li>Fixed a bug where individual players weren't mapping properly</li>
        <li>Minor code cleanup</li>
      </ul>
      <h4>0.4.2</h4>
      <ul>
        <li>
          Added the ability to specify a date or week when querying the roster
          resource.
        </li>
        <li>Cleaned up the player normalization model</li>
        <li>Fixed a bug where the team.roster call was erroring</li>
      </ul>
      <h4>0.4.1</h4>
      <ul>
        <li>Fixes to how POST data is handled</li>
      </ul>
      <h4>0.4.0</h4>
      <ul>
        <li>
          Significantly restructured the code to have more consistency and set
          it up better for future plans, namely POST methods and proper unit
          testing * Removed the "refresh user token" and instead return the
          error to the user who can handle the refresh within their application.
        </li>
      </ul>
      <h4>0.3.1</h4>
      <ul>
        <li>
          Additional player attributes added, thanks{" "}
          <a
            href="https://github.com/ryus08"
            target="_blank"
            rel="noopener noreferrer"
          >
            ryus08
          </a>
          !
        </li>
      </ul>
      <h4>0.3.0</h4>
      <ul>
        <li>Added a method to refresh the user's token if it has expired.</li>
      </ul>
      <h4>0.2.2</h4>
      <ul>
        <li>Hotfix to fix "Teams" collection - use error first convention</li>
      </ul>
      <h4>0.2.0</h4>
      <ul>
        <li>Made helper classes more consistent</li>
        <li>Added collections for games, leagues, players, and teams</li>
        <li>Moved to error first convention because JavaScript</li>
      </ul>
      <h4>0.1.2</h4>
      <ul>
        <li>Added 'Team Matchups' subresource</li>
        <li>Added 'League Scoreboard' subresource</li>
        <li>Minor code cleanup and improvements</li>
      </ul>
      <h4>0.1.1</h4>
      <ul>
        <li>
          Refactored module to fix a bug where user sessions were not
          necessarily unique because of require caching.
        </li>
      </ul>
      <h4>0.1</h4>
      <ul>
        <li>Initial release.</li>
      </ul>
    </>
  );
};

export default Changelog;
