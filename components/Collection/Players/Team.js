import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const PlayersTeam = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [teamKey, setTeamKey] = useState(null);
  const [teamKeyError, setTeamKeyError] = useState(false);

  const [filters, setFilters] = useState({});
  const [subresources, setSubresources] = useState([]);

  const [loading, setLoading] = useState(false);

  const updateFilter = (key, val) => {
    setFilters({
      ...filters,
      [key]: val,
    });
  };

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

    const data = await api("/players/teams", {
      teamKey,
      filters,
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

    if (idx >= 0) {
      const newSubs = subresources;
      newSubs.splice(idx, 1);
      setSubresources([...newSubs]);
    } else {
      setSubresources([...subresources, key]);
    }
  };

  return (
    <>
      <h2 className={cx(appStyles.public, appStyles.private)}>players.teams</h2>
      <p>
        Retrieve information about multiple players across multiple teams in a
        single request.
      </p>
      <p>
        Users can only retrieve data for private leagues of which they are a
        member if they have provided a valid OAuthToken upon authenticating your
        application. Leagues that have been designated as public can be queried
        without user authentication.
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
                The key(s) for the player(s) you'd like to query. League key
                format: {`{game_key}.l.{league_id}.t.{team_id}`}
              </div>
            </div>
          </div>

          <div className={cx(appStyles.table, appStyles.filters)}>
            <div className={cx(appStyles.header, appStyles.row)}>
              <div>Filters</div>
              {activeTab === "tester" && <div>Value</div>}
              <div>Description</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.filter)}>start</div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="text"
                    onChange={(e) => updateFilter("start", e.target.value)}
                  ></input>
                </div>
              )}
              <div>record to start from</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.filter)}>count</div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="text"
                    onChange={(e) => updateFilter("count", e.target.value)}
                  ></input>
                </div>
              )}
              <div>the number of results to retrieve</div>
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
              <div>Retrieve the stats for the retrieved players.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                ownership
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("ownership")}
                  ></input>
                </div>
              )}
              <div>Retrieve the ownership for the retrieved players.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                percent_owned
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("percent_owned")}
                  ></input>
                </div>
              )}
              <div>Retrieve the percent_owned for the retrieved players.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                draft_analysis
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("draft_analysis")}
                  ></input>
                </div>
              )}
              <div>Retrieve the draft_analysis for the retrieved players.</div>
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
  const players = await yf.players.league(
    [league_keys],
    {filters}, // optional
    [subresources], // optional
  );
} catch (e) {
  // handle error
}

// callback based
yf.players.league(
  [league_keys], 
  {filters}, // optional
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
                      league_key: "328.l.34014",
                      league_id: "34014",
                      name: "Freddy Beach Baseball",
                      url:
                        "http://baseball.fantasysports.yahoo.com/archive/mlb/2014/34014",
                      league_chat_id: "",
                      draft_status: "postdraft",
                      num_teams: 12,
                      edit_key: "2015-02-04",
                      weekly_deadline: "intraday",
                      league_update_timestamp: "1411979069",
                      scoring_type: "head",
                      league_type: "private",
                      renew: "308_51222",
                      renewed: "346_1106",
                      short_invitation_url:
                        "https://yho.com/mlb?l=34014&k=0a2bf56970bb200c",
                      is_pro_league: "0",
                      current_week: "25",
                      start_week: "1",
                      start_date: "2014-03-22",
                      end_week: "25",
                      end_date: "2014-09-28",
                      is_finished: 1,
                      players: [
                        {
                          player_key: "328.p.7264",
                          player_id: "7264",
                          name: {
                            full: "José Bautista",
                            first: "José",
                            last: "Bautista",
                            ascii_first: "Jose",
                            ascii_last: "Bautista",
                          },
                          editorial_player_key: "mlb.p.7264",
                          editorial_team_key: "mlb.t.14",
                          editorial_team_full_name: "Toronto Blue Jays",
                          editorial_team_abbr: "Tor",
                          uniform_number: "19",
                          display_position: "1B,OF",
                          headshot: {
                            url:
                              "http://l.yimg.com/iu/api/res/1.2/9V26x2764H1l8ST0R6eajg--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/7264.1.jpg",
                            size: "small",
                          },
                          is_undroppable: "0",
                          position_type: "B",
                          eligible_positions: ["1B", "OF", "Util"],
                          draft_analysis: {
                            average_pick: "30.8",
                            average_round: "3.3",
                            average_cost: "27.0",
                            percent_drafted: "1.00",
                          },
                        },
                        {
                          player_key: "328.p.8644",
                          player_id: "8644",
                          name: {
                            full: "Domonic Brown",
                            first: "Domonic",
                            last: "Brown",
                            ascii_first: "Domonic",
                            ascii_last: "Brown",
                          },
                          editorial_player_key: "mlb.p.8644",
                          editorial_team_key: "mlb.t.22",
                          editorial_team_full_name: "Philadelphia Phillies",
                          editorial_team_abbr: "Phi",
                          uniform_number: "9",
                          display_position: "OF",
                          headshot: {
                            url:
                              "http://l.yimg.com/iu/api/res/1.2/wkPExRUb.XyjBpPKmHWUFQ--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/8644.1.jpg",
                            size: "small",
                          },
                          is_undroppable: "0",
                          position_type: "B",
                          eligible_positions: ["OF", "Util"],
                          draft_analysis: {
                            average_pick: "124.7",
                            average_round: "11.8",
                            average_cost: "9.4",
                            percent_drafted: "1.00",
                          },
                        },
                        {
                          player_key: "328.p.7498",
                          player_id: "7498",
                          name: {
                            full: "Shin-Soo Choo",
                            first: "Shin-Soo",
                            last: "Choo",
                            ascii_first: "Shin-Soo",
                            ascii_last: "Choo",
                          },
                          editorial_player_key: "mlb.p.7498",
                          editorial_team_key: "mlb.t.13",
                          editorial_team_full_name: "Texas Rangers",
                          editorial_team_abbr: "Tex",
                          uniform_number: "17",
                          display_position: "OF",
                          headshot: {
                            url:
                              "http://l.yimg.com/iu/api/res/1.2/vpGz9xTjYIf.3trxbXZvgw--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/7498.1.jpg",
                            size: "small",
                          },
                          is_undroppable: "0",
                          position_type: "B",
                          eligible_positions: ["OF", "Util"],
                          draft_analysis: {
                            average_pick: "42.0",
                            average_round: "4.4",
                            average_cost: "25.1",
                            percent_drafted: "1.00",
                          },
                        },
                        {
                          player_key: "328.p.6983",
                          player_id: "6983",
                          name: {
                            full: "Coco Crisp",
                            first: "Coco",
                            last: "Crisp",
                            ascii_first: "Coco",
                            ascii_last: "Crisp",
                          },
                          editorial_player_key: "mlb.p.6983",
                          editorial_team_key: "mlb.t.11",
                          editorial_team_full_name: "Oakland Athletics",
                          editorial_team_abbr: "Oak",
                          uniform_number: "4",
                          display_position: "OF",
                          headshot: {
                            url:
                              "http://l.yimg.com/iu/api/res/1.2/gTI1sn2_l8sDR3B_epsvpA--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/6983.1.jpg",
                            size: "small",
                          },
                          is_undroppable: "0",
                          position_type: "B",
                          eligible_positions: ["OF", "Util"],
                          draft_analysis: {
                            average_pick: "128.0",
                            average_round: "12.1",
                            average_cost: "7.1",
                            percent_drafted: "1.00",
                          },
                        },
                        {
                          player_key: "328.p.7934",
                          player_id: "7934",
                          name: {
                            full: "Carlos González",
                            first: "Carlos",
                            last: "González",
                            ascii_first: "Carlos",
                            ascii_last: "Gonzalez",
                          },
                          editorial_player_key: "mlb.p.7934",
                          editorial_team_key: "mlb.t.27",
                          editorial_team_full_name: "Colorado Rockies",
                          editorial_team_abbr: "Col",
                          uniform_number: "5",
                          display_position: "OF",
                          headshot: {
                            url:
                              "http://l.yimg.com/iu/api/res/1.2/CAaVkp7i4ZdyshkVpkk5Kw--/YXBwaWQ9eXZpZGVvO…g--/http://l.yimg.com/j/assets/i/us/sp/v/mlb/players_l/20130405/7934.1.jpg",
                            size: "small",
                          },
                          is_undroppable: "0",
                          position_type: "B",
                          eligible_positions: ["OF", "Util"],
                          draft_analysis: {
                            average_pick: "6.9",
                            average_round: "1.1",
                            average_cost: "43.8",
                            percent_drafted: "1.00",
                          },
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

export default PlayersTeam;
