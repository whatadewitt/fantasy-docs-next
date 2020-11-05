import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const GameLeagues = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [gameKey, setGameKey] = useState(null);
  const [gameKeyError, setGameKeyError] = useState(false);

  const [leagueKeys, setLeagueKeys] = useState(null);
  const [leagueKeysError, setLeagueKeysError] = useState(false);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === gameKey) {
      setGameKeyError(true);
    } else {
      setGameKeyError(false);
    }

    if (null === leagueKeys) {
      setLeagueKeysError(true);
    } else {
      setLeagueKeysError(false);
    }

    // because of hooks...
    if (null === leagueKeys || null === gameKey) {
      return;
    }

    // TODO: multiple keys...
    const data = await api("/game/leagues", {
      gameKey,
      leagueKeys,
    });

    setResponse(data);
  };

  useEffect(() => {
    if (response) {
      setLoading(false);
    }
  }, [response]);

  const updateInput = (cb, val) => {
    return cb(val);
  };

  return (
    <>
      <h2 className={cx(appStyles.public, appStyles.private)}>game.leagues</h2>
      <p>Retrieve information about a league or leagues.</p>
      <p>
        Leagues that are marked as "public" are publicly queryable, while all
        other leagues will require a user to be logged in and part of the league
        to query.
      </p>

      <p>
        You can specify either a single league id, or an array of league id's to
        return multiple leagues from the same game.
      </p>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div>
        <h3>{activeTab === "description" ? "Arguments" : "Try It Out"}</h3>
        <form onSubmit={(e) => makeAPICall(e)}>
          <div className={appStyles.table}>
            <div className={cx(appStyles.header, appStyles.row)}>
              <div>Argument</div>
              {activeTab === "tester" && <div>Value</div>}
              <div>Description</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.required)}>
                game_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: gameKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setGameKey, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                Key for the game you want to query. You can find a list of
                common game_ids in the{" "}
                <a
                  href="https://developer.yahoo.com/fantasysports/guide/#game-resource"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  official Yahoo! Fantasy Sports documentation for the game
                  resource
                </a>
                . Game key examples: 'mlb', 'nfl', 328 (2014 MLB season), 242
                (2010 NFL season)
              </div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.required)}>
                league_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: leagueKeysError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setLeagueKeys, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                Key(s) of the league(s) you'd like to retrieve. League key
                format: {`{game_key}.l.{league_id}`}. For the purposes of this
                demo, you can enter a comma separated list of league keys for
                the array.
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {(gameKeyError || leagueKeysError) && (
                <div className={appStyles.err}>
                  Please enter a value for all required fields
                </div>
              )}
              <button
                onClick={makeAPICall}
                className={appStyles.button}
                type="submit"
              >
                {loading ? (
                  <div className={appStyles.spinner}>
                    <div className={appStyles.bounce1}></div>
                    <div className={appStyles.bounce2}></div>
                    <div className={appStyles.bounce3}></div>
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          )}
        </form>

        {response && activeTab === "tester" && <CodeBlock code={response} />}

        {activeTab === "description" && (
          <>
            <div>
              <h3>How to use</h3>
              <CodeBlock>{`const YahooFantasy = require('yahoo-fantasy');
const yf = new YahooFantasy(
  Y!APPLICATION_KEY,
  Y!APPLICATION_SECRET,
  tokenCallbackFn, // optional
  redirectUri // optional
);

yf.setUserToken(
  Y!OAuthAccessToken
);

// promise based
try {
  const leagues = yf.game.leagues(game_key, league_key(s));
} catch (e) {
  // handle error
}

// callback based
yf.game.leagues(game_key, league_key(s), callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    game_key: "328",
                    game_id: "328",
                    name: "Baseball",
                    code: "mlb",
                    type: "full",
                    url: "http://baseball.fantasysports.yahoo.com/b1",
                    season: "2014",
                    leagues: [
                      {
                        league_key: "328.l.34014",
                        league_id: "34014",
                        name: "Freddy Beach Baseball",
                        url: "http://baseball.fantasysports.yahoo.com/b1/34014",
                        draft_status: "postdraft",
                        num_teams: 12,
                        edit_key: "2014-11-13",
                        weekly_deadline: "intraday",
                        league_update_timestamp: "1411979069",
                        scoring_type: "head",
                        league_type: "private",
                        renew: "308_51222",
                        renewed: "",
                        short_invitation_url:
                          "https://yho.com/mlb?l=34014&k=0a2bf56970bb200c",
                        is_pro_league: "0",
                        current_week: "25",
                        start_week: "1",
                        start_date: "2014-03-22",
                        end_week: "25",
                        end_date: "2014-09-28",
                        is_finished: 1,
                      },
                    ],
                  },
                  null,
                  2
                )}
              </CodeBlock>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default GameLeagues;
