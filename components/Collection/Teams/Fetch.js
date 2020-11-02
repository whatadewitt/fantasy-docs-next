import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const TeamsFetch = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [teamKey, setTeamKey] = useState(null);
  const [teamKeyError, setTeamKeyError] = useState(false);

  const [subresources, setSubresources] = useState([]);

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

    const data = await api("/teams/fetch", {
      teamKey,
      subresources,
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

  const updateSubresources = (key) => {
    const idx = subresources.findIndex((k) => k === key);

    if (idx > 0) {
      const newSubs = subresources;
      newSubs.splice(idx, 1);
      setSubresources([...newSubs]);
    } else {
      setSubresources([...subresources, key]);
    }
  };

  return (
    <>
      <h2 className={appStyles.public}>teams.fetch</h2>
      <p>Retrieve information about multiple teams in a single request.</p>

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
                Key for the team you want to query. Team key format:{" "}
                {`{game_key}.l.{league_id}.t.{team_id}`}
              </div>
            </div>
          </div>

          <div className={cx(appStyles.table, appStyles.subresource)}>
            <div className={cx(appStyles.header, appStyles.row)}>
              <div>Subresource</div>
              {activeTab === "tester" && <div>Select</div>}
              <div>Description</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                stats
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("stats")}
                  ></input>
                </div>
              )}
              <div>Retrieve the stats for the retrieved teams.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                standings
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("standings")}
                  ></input>
                </div>
              )}
              <div>Retrieve the standings for the retrieved teams.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                roster
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("roster")}
                  ></input>
                </div>
              )}
              <div>Retrieve the rosters for the retrieved teams.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                draftresults
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("draftresults")}
                  ></input>
                </div>
              )}
              <div>
                Retrieve the draftresults for the retrieved teams.{" "}
                <em>
                  (note the difference between the naming here versus that of
                  the league resource)
                </em>
              </div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                matchups
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("matchups")}
                  ></input>
                </div>
              )}
              <div>Retrieve the matchups for the retrieved teams.</div>
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
  const teams = yf.teams.fetch(
    [team_keys],
    [subresources], // optional
  );
} catch (e) {
  // handle error
}

// callback based
yf.teams.fetch(
  [team_keys], 
  [subresources], // optional
  callbackFn
);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  [
                    {
                      team_key: "328.l.34014.t.1",
                      team_id: "1",
                      name: "ChicksDigTheLongBall",
                      url:
                        "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014/1",
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
                      stats: {
                        coverage_type: "season",
                        season: "2014",
                        stats: [
                          { stat_id: "60", value: "" },
                          { stat_id: "7", value: "676" },
                          { stat_id: "12", value: "126" },
                          { stat_id: "13", value: "623" },
                          { stat_id: "16", value: "126" },
                          { stat_id: "3", value: ".275" },
                          { stat_id: "50", value: "1555.0" },
                          { stat_id: "28", value: "101" },
                          { stat_id: "32", value: "67" },
                          { stat_id: "42", value: "1264" },
                          { stat_id: "26", value: "3.56" },
                          { stat_id: "27", value: "1.20" },
                        ],
                      },
                      draftresults: [
                        {
                          pick: 11,
                          round: 1,
                          cost: "34",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.7254",
                        },
                        {
                          pick: 37,
                          round: 4,
                          cost: "26",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.8857",
                        },
                        {
                          pick: 67,
                          round: 6,
                          cost: "10",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.8412",
                        },
                        {
                          pick: 70,
                          round: 6,
                          cost: "29",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.7779",
                        },
                        {
                          pick: 83,
                          round: 7,
                          cost: "6",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.8167",
                        },
                        {
                          pick: 84,
                          round: 7,
                          cost: "3",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.9126",
                        },
                        {
                          pick: 91,
                          round: 8,
                          cost: "16",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.7483",
                        },
                        {
                          pick: 99,
                          round: 9,
                          cost: "3",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.6014",
                        },
                        {
                          pick: 100,
                          round: 9,
                          cost: "13",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.6637",
                        },
                        {
                          pick: 120,
                          round: 10,
                          cost: "1",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.6765",
                        },
                        {
                          pick: 137,
                          round: 12,
                          cost: "2",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.5763",
                        },
                        {
                          pick: 153,
                          round: 13,
                          cost: "5",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.9302",
                        },
                        {
                          pick: 162,
                          round: 14,
                          cost: "11",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.7865",
                        },
                        {
                          pick: 170,
                          round: 15,
                          cost: "2",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.9140",
                        },
                        {
                          pick: 177,
                          round: 15,
                          cost: "2",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.9327",
                        },
                        {
                          pick: 191,
                          round: 16,
                          cost: "7",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.8554",
                        },
                        {
                          pick: 192,
                          round: 16,
                          cost: "1",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.8773",
                        },
                        {
                          pick: 193,
                          round: 17,
                          cost: "3",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.6983",
                        },
                        {
                          pick: 194,
                          round: 17,
                          cost: "36",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.7066",
                        },
                        {
                          pick: 195,
                          round: 17,
                          cost: "50",
                          team_key: "328.l.34014.t.1",
                          player_key: "328.p.7163",
                        },
                      ],
                    },
                  ],
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

export default TeamsFetch;
