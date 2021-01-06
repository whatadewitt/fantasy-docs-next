import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const UserGameTeams = () => {
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

    const data = await api("/user/game_teams", {
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
      <h2 className={appStyles.private}>user.game_teams</h2>
      <p>
        Retrieve teams that the user belongs to in one or more games. The teams
        will be scoped to the user. This will throw an error if any of the
        specified games do not support league sub-resources. Users must be
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
  const players = await yf.user.game_teams(game_key);
} catch (e) {
  // handle error
}

// callback based
yf.user.game_teams(game_key, callbackFn);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                    teams: [
                      {
                        game_key: "328",
                        game_id: "328",
                        name: "Baseball",
                        code: "mlb",
                        type: "full",
                        url: "http://baseball.fantasysports.yahoo.com/b1",
                        season: "2014",
                        teams: [
                          {
                            team_key: "328.l.24281.t.7",
                            team_id: "7",
                            name: "ChicksDigTheLongBall",
                            is_owned_by_current_login: 1,
                            url:
                              "http://baseball.fantasysports.yahoo.com/b1/24281/7",
                            team_logo:
                              "https://i.imgur-ysports.com/PhEXA9Ry.jpg",
                            waiver_priority: 6,
                            number_of_moves: "18",
                            number_of_trades: 0,
                            managers: [
                              {
                                manager_id: "7",
                                nickname: "dewberry",
                                guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                                is_current_login: "1",
                                email: "dewey@whatadewitt.com",
                                image_url:
                                  "https://socialprofiles.zenfs.com/images/8ed931b36884df369fae061f758e1c43_64.jpg",
                              },
                            ],
                          },
                          {
                            team_key: "328.l.34014.t.1",
                            team_id: "1",
                            name: "ChicksDigTheLongBall",
                            is_owned_by_current_login: 1,
                            url:
                              "http://baseball.fantasysports.yahoo.com/b1/34014/1",
                            team_logo:
                              "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_6_lg.gif",
                            waiver_priority: 4,
                            number_of_moves: "19",
                            number_of_trades: 0,
                            clinched_playoffs: 1,
                            managers: [
                              {
                                manager_id: "1",
                                nickname: "dewberry",
                                guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                                is_commissioner: "1",
                                is_current_login: "1",
                                email: "dewey@whatadewitt.com",
                                image_url:
                                  "https://socialprofiles.zenfs.com/images/8ed931b36884df369fae061f758e1c43_64.jpg",
                              },
                            ],
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
                        teams: [
                          {
                            team_key: "341.l.21063.t.1",
                            team_id: "1",
                            name: "Neal in the Staal",
                            is_owned_by_current_login: 1,
                            url:
                              "http://hockey.fantasysports.yahoo.com/hockey/21063/1",
                            team_logo:
                              "https://i.imgur-ysports.com/PhEXA9Ry.jpg",
                            waiver_priority: 9,
                            number_of_moves: "4",
                            number_of_trades: 0,
                            managers: [
                              {
                                manager_id: "1",
                                nickname: "dewberry",
                                guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                                is_commissioner: "1",
                                is_current_login: "1",
                                email: "dewey@whatadewitt.com",
                                image_url:
                                  "https://socialprofiles.zenfs.com/images/8ed931b36884df369fae061f758e1c43_64.jpg",
                              },
                            ],
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

export default UserGameTeams;
