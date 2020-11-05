import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const GamesUser = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [filters, setFilters] = useState({});
  const [subresources, setSubresources] = useState([]);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    const data = await api("/games/user", {
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

  const updateFilter = (key, val) => {
    setFilters({
      ...filters,
      [key]: val,
    });
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
      <h2 className={appStyles.private}>games.fetch</h2>
      <p>
        Retrieve information about multiple games in a single request for the
        current logged in user.
      </p>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div>
        <h3>{activeTab === "description" ? "Arguments" : "Try It Out"}</h3>
        <form onSubmit={(e) => makeAPICall(e)}>
          <div className={appStyles.table}>
            <div className={cx(appStyles.header, appStyles.row)}>
              <div>Filters</div>
              {activeTab === "tester" && <div>Value</div>}
              <div>Description</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.filter)}>
                is_available
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="text"
                    onChange={(e) =>
                      updateFilter("is_available", e.target.value)
                    }
                  ></input>
                </div>
              )}
              <div>Use `1` to only show games that are in season.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.filter)}>
                game_types
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="text"
                    onChange={(e) => updateFilter("game_types", e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                Choose from the following (comma separated for multiple):
                <ul className={appStyles.filterOptions}>
                  <li>full</li>
                  <li>pickem-team</li>
                  <li>pickem-group</li>
                  <li>pickem-team-list</li>
                </ul>
              </div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.filter)}>
                game_codes
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="text"
                    onChange={(e) => updateFilter("game_codes", e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                Game codes are simply game keys for the game you want to query.
                You can find a list of common game_ids in the{" "}
                <a
                  href="https://developer.yahoo.com/fantasysports/guide/#game-resource"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  official Yahoo! Fantasy Sports documentation for the game
                  resource
                </a>
                . Game key examples: 'mlb', 'nfl', 328 (2014 MLB season), 242
                (2010 NFL season). Comma separated for multiple.
              </div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.filter)}>seasons</div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="text"
                    onChange={(e) => updateFilter("seasons", e.target.value)}
                  ></input>
                </div>
              )}
              <div>Any valid seasons. Comma separated for multiple.</div>
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
                game_weeks
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("game_weeks")}
                  ></input>
                </div>
              )}
              <div>Retrieve the game weeks for the retrieved games.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                stat_categories
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("stat_categories")}
                  ></input>
                </div>
              )}
              <div>Retrieve the stat categories for the retrieved games.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                position_types
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("position_types")}
                  ></input>
                </div>
              )}
              <div>Retrieve the position types for the retrieved games.</div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.subresource)}>
                roster_positions
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={appStyles.value}
                    type="checkbox"
                    onChange={(e) => updateSubresources("roster_positions")}
                  ></input>
                </div>
              )}
              <div>Retrieve the roster positions for the retrieved games.</div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
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
  const games = yf.games.user(
    {filters}, // optional
    [subresources], // optional
  );
} catch (e) {
  // handle error
}

// callback based
yf.games.user(
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
                      game_key: "308",
                      game_id: "308",
                      name: "Baseball",
                      code: "mlb",
                      type: "full",
                      url: "http://baseball.fantasysports.yahoo.com/b1",
                      season: "2013",
                      leagues: [
                        {
                          league_key: "308.l.5853",
                          league_id: "5853",
                          name: "FKL Baseball - Season VII",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2013/5853",
                          league_chat_id: "",
                          draft_status: "postdraft",
                          num_teams: 13,
                          edit_key: "2015-02-04",
                          weekly_deadline: "intraday",
                          league_update_timestamp: "1380528581",
                          scoring_type: "point",
                          league_type: "private",
                          renew: "268_26677",
                          renewed: "328_24281",
                          short_invitation_url: false,
                          is_pro_league: "0",
                          start_date: "2013-03-31",
                          end_date: "2013-09-29",
                          is_finished: 1,
                        },
                        {
                          league_key: "308.l.51222",
                          league_id: "51222",
                          name: "Freddy Beach Baseball",
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2013/51222",
                          password: "fantasyb",
                          league_chat_id: "",
                          draft_status: "postdraft",
                          num_teams: 12,
                          edit_key: "2015-02-04",
                          weekly_deadline: "intraday",
                          league_update_timestamp: "1380528992",
                          scoring_type: "head",
                          league_type: "private",
                          renew: "268_46504",
                          renewed: "328_34014",
                          short_invitation_url: false,
                          is_pro_league: "0",
                          current_week: "25",
                          start_week: "1",
                          start_date: "2013-03-31",
                          end_week: "25",
                          end_date: "2013-09-29",
                          is_finished: 1,
                        },
                      ],
                      teams: [
                        {
                          team_key: "308.l.5853.t.2",
                          team_id: "2",
                          name: "ChicksDigTheLongBall",
                          is_owned_by_current_login: 1,
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2013/5853/2",
                          team_logo: "https://i.imgur-ysports.com/PhEXA9Ry.jpg",
                          waiver_priority: 8,
                          number_of_moves: "20",
                          number_of_trades: "3",
                          managers: [
                            {
                              manager_id: "2",
                              nickname: "[REDACTED]",
                              guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                              is_current_login: "1",
                              email: "[REDACTED]",
                              image_url:
                                "https://s.yimg.com/wv/images/8ed931b36884df369fae061f758e1c43_64.jpg",
                            },
                          ],
                        },
                        {
                          team_key: "308.l.51222.t.1",
                          team_id: "1",
                          name: "ChicksDigTheLongBall",
                          is_owned_by_current_login: 1,
                          url:
                            "http://baseball.fantasysports.yahoo.com/archive/mlb/2013/51222/1",
                          team_logo:
                            "http://l.yimg.com/dh/ap/fantasy/img/mlb/icon_6_lg.gif",
                          waiver_priority: 9,
                          number_of_moves: "31",
                          number_of_trades: "1",
                          clinched_playoffs: 1,
                          managers: [
                            {
                              manager_id: "1",
                              nickname: "[REDACTED]",
                              guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                              is_commissioner: "1",
                              is_current_login: "1",
                              email: "[REDACTED]",
                              image_url:
                                "https://s.yimg.com/wv/images/8ed931b36884df369fae061f758e1c43_64.jpg",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      game_key: "321",
                      game_id: "321",
                      name: "Hockey",
                      code: "nhl",
                      type: "full",
                      url: "http://hockey.fantasysports.yahoo.com/hockey",
                      season: "2013",
                      leagues: [
                        {
                          league_key: "321.l.63055",
                          league_id: "63055",
                          name: "theREDleague",
                          url:
                            "http://hockey.fantasysports.yahoo.com/archive/nhl/2013/63055",
                          password: "",
                          league_chat_id: "",
                          draft_status: "postdraft",
                          num_teams: 11,
                          edit_key: "2015-02-04",
                          weekly_deadline: "intraday",
                          league_update_timestamp: "1397456678",
                          scoring_type: "point",
                          league_type: "private",
                          renew: "",
                          renewed: "341_21063",
                          short_invitation_url: "http://y.ahoo.it/xedvzlLA",
                          is_pro_league: "0",
                          start_date: "2013-10-01",
                          end_date: "2014-04-13",
                          is_finished: 1,
                        },
                      ],
                      teams: [
                        {
                          team_key: "321.l.63055.t.1",
                          team_id: "1",
                          name: "Kane't Get Enough",
                          is_owned_by_current_login: 1,
                          url:
                            "http://hockey.fantasysports.yahoo.com/archive/nhl/2013/63055/1",
                          team_logo: "https://i.imgur-ysports.com/PhEXA9Ry.jpg",
                          waiver_priority: 8,
                          number_of_moves: "17",
                          number_of_trades: "3",
                          managers: [
                            {
                              manager_id: "1",
                              nickname: "[REDACTED]",
                              guid: "RYWP7M53IC626MGOX36ZWCM4FA",
                              is_commissioner: "1",
                              is_current_login: "1",
                              email: "[REDACTED]",
                              image_url:
                                "https://s.yimg.com/wv/images/8ed931b36884df369fae061f758e1c43_64.jpg",
                            },
                          ],
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

export default GamesUser;
