import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const TeamMatchups = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [teamKey, setTeamKey] = useState(null);
  const [teamKeyError, setTeamKeyError] = useState(false);

  const [week, setWeek] = useState(null);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === teamKey) {
      return setTeamKeyError(true);
    } else {
      setTeamKeyError(false);
    }

    setLoading(true);

    const data = await api("/team/matchups", {
      teamKey,
      week,
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
      <h2 className={cx(appStyles.public, appStyles.private)}>team.matchups</h2>
      <p>
        Retrieve data regarding team matchups for each week of a season. Users
        must be authenticated and a member of the league to query against teams
        of private leagues.
      </p>
      <p>Will only work for Head-to-Head style leagues.</p>
      <p>Added the "weeks" param in v0.4.3.</p>

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
                team_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: teamKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setTeamKey, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                The key for the team you'd like to query. Team key format:{" "}
                {`{game_key}.l.{league_id}.t.{team_id}`}
              </div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg)}>week</div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="text"
                    onChange={(e) => updateInput(setWeek, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                The week number(s) you'd like the matchup for. If no weeks are
                specified, all matchups for the season will be returned.
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {teamKeyError && (
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
  const matchups = await yf.team.matchups(
    team_key,
    [weeks] // optional
  );
} catch (e) {
  // handle error
}

// callback based
yf.team.matchups(
  team_key,
  [weeks], // optional
  callbackFn
);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    team_key: "328.l.34014.t.1",
                    team_id: "1",
                    name: "ChicksDigTheLongBall",
                    url: "http://baseball.fantasysports.yahoo.com/b1/34014/1",
                    team_logo:
                      "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_6_lg.gif",
                    waiver_priority: 4,
                    number_of_moves: "19",
                    number_of_trades: 0,
                    clinched_playoffs: 1,
                    managers: [
                      {
                        manager_id: "1",
                        nickname: "--hidden--",
                        guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                        is_commissioner: "1",
                      },
                    ],
                    matchups: [
                      {
                        week: "1",
                        week_start: "2014-03-22",
                        week_end: "2014-04-06",
                        status: "postevent",
                        is_playoffs: "0",
                        is_consolation: "0",
                        is_tied: 0,
                        winner_team_key: "328.l.34014.t.2",
                        teams: [
                          {
                            team_key: "328.l.34014.t.1",
                            team_id: "1",
                            name: "ChicksDigTheLongBall",
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
                                nickname: "--hidden--",
                                guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                                is_commissioner: "1",
                              },
                            ],
                            points: {
                              coverage_type: "week",
                              week: "1",
                              total: "3",
                            },
                            stats: [
                              { stat_id: "60", value: "71/218" },
                              { stat_id: "7", value: "32" },
                              { stat_id: "12", value: "6" },
                              { stat_id: "13", value: "28" },
                              { stat_id: "16", value: "6" },
                              { stat_id: "3", value: ".326" },
                              { stat_id: "50", value: "47.1" },
                              { stat_id: "28", value: "2" },
                              { stat_id: "32", value: "3" },
                              { stat_id: "42", value: "35" },
                              { stat_id: "26", value: "2.47" },
                              { stat_id: "27", value: "0.93" },
                            ],
                          },
                          {
                            team_key: "328.l.34014.t.2",
                            team_id: "2",
                            name: "SALEBOAT",
                            url:
                              "http://baseball.fantasysports.yahoo.com/b1/34014/2",
                            team_logo:
                              "https://i.imgur-ysports.com/k9xxNC8y.jpg",
                            waiver_priority: 8,
                            number_of_moves: "30",
                            number_of_trades: "2",
                            clinched_playoffs: 1,
                            managers: [
                              {
                                manager_id: "2",
                                nickname: "--hidden--",
                                guid: "APYOZ4FEZELDRTK3F3FEBYTDPY",
                              },
                            ],
                            points: {
                              coverage_type: "week",
                              week: "1",
                              total: "6",
                            },
                            stats: [
                              { stat_id: "60", value: "63/230" },
                              { stat_id: "7", value: "35" },
                              { stat_id: "12", value: "11" },
                              { stat_id: "13", value: "34" },
                              { stat_id: "16", value: "12" },
                              { stat_id: "3", value: ".274" },
                              { stat_id: "50", value: "52.0" },
                              { stat_id: "28", value: "5" },
                              { stat_id: "32", value: "3" },
                              { stat_id: "42", value: "55" },
                              { stat_id: "26", value: "2.94" },
                              { stat_id: "27", value: "0.96" },
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

export default TeamMatchups;
