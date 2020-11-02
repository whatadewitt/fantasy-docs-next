import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const UserGameLeagues = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [gameKey, setGameKey] = useState(null);
  const [gameKeyError, setGameKeyError] = useState(false);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === gameKey) {
      return setGameKeyError(true);
    } else {
      setGameKeyError(false);
    }

    setLoading(true);

    const data = await api("/user/game_leagues", {
      gameKey,
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
      <h2 className={appStyles.private}>user.game_leagues</h2>
      <p>
        Retrieve leagues that the user belongs to in one or more games. The
        leagues will be scoped to the user. This will throw an error if any of
        the specified games do not support league sub-resources. Users must be
        authenticated in order to use this endpoint.
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
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {gameKeyError && (
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
  const players = yf.user.game_leagues(game_key);
} catch (e) {
  // handle error
}

// callback based
yf.user.game_leagues(game_key, callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                    leagues: [
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
                            league_key: "328.l.24281",
                            league_id: "24281",
                            name: "FKL Baseball - Season VIII",
                            url:
                              "http://baseball.fantasysports.yahoo.com/b1/24281",
                            draft_status: "postdraft",
                            num_teams: 13,
                            edit_key: "2014-11-15",
                            weekly_deadline: "intraday",
                            league_update_timestamp: "1411977871",
                            scoring_type: "point",
                            league_type: "private",
                            renew: "308_5853",
                            renewed: "",
                            short_invitation_url:
                              "https://yho.com/mlb?l=24281&k=ca97a25b0913fcb3",
                            is_pro_league: "0",
                            start_date: "2014-03-22",
                            end_date: "2014-09-28",
                            is_finished: 1,
                          },
                          {
                            league_key: "328.l.34014",
                            league_id: "34014",
                            name: "Freddy Beach Baseball",
                            url:
                              "http://baseball.fantasysports.yahoo.com/b1/34014",
                            password: "",
                            draft_status: "postdraft",
                            num_teams: 12,
                            edit_key: "2014-11-15",
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
                      {
                        game_key: "341",
                        game_id: "341",
                        name: "Hockey",
                        code: "nhl",
                        type: "full",
                        url: "http://hockey.fantasysports.yahoo.com/hockey",
                        season: "2014",
                        leagues: [
                          {
                            league_key: "341.l.21063",
                            league_id: "21063",
                            name: "theREDleague",
                            url:
                              "http://hockey.fantasysports.yahoo.com/hockey/21063",
                            password: "",
                            draft_status: "postdraft",
                            num_teams: 14,
                            edit_key: "2014-11-15",
                            weekly_deadline: "intraday",
                            league_update_timestamp: "1416042475",
                            scoring_type: "point",
                            league_type: "private",
                            renew: "321_63055",
                            renewed: "",
                            short_invitation_url:
                              "https://yho.com/nhl?l=21063&k=7a5b54fa3927ebc2",
                            is_pro_league: "0",
                            start_date: "2014-10-08",
                            end_date: "2015-04-11",
                          },
                        ],
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

export default UserGameLeagues;
