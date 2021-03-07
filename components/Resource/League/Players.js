import React, { useEffect, useState } from "react";

import appStyles from "../../Layout/Layout.module.scss";
import cx from "classnames";

import Tabs from "../../Tabs/Tabs";
import { api } from "../../../services/api";
import CodeBlock from "../../CodeBlock/CodeBlock";

const LeaguePlayers = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [response, setResponse] = useState(null);

  const [leagueKey, setLeagueKey] = useState(null);
  const [leagueKeyError, setLeagueKeyError] = useState(false);

  const [playerKeys, setPlayerKeys] = useState(null);
  const [playerKeysError, setPlayerKeysError] = useState(false);

  const [week, setWeek] = useState(null);

  const [loading, setLoading] = useState(false);

  const makeAPICall = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    if (null === leagueKey) {
      return setLeagueKeyError(true);
    } else {
      setLeagueKeyError(false);
    }

    // because of hooks...
    if (null === playerKeys || null === leagueKey) {
      return;
    }

    if (null === playerKeys) {
      return setPlayerKeysError(true);
    } else {
      setPlayerKeysError(false);
    }

    setLoading(true);

    const data = await api("/league/players", {
      leagueKey,
      playerKeys,
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
      <h2 className={cx(appStyles.public, appStyles.private)}>
        league.players
      </h2>
      <p>
        Subresource to retrieve league eligible players and their stats in a
        league specific context. Users must be authenticated and a member of the
        league to query against private leagues.
      </p>
      <p>
        Additionally, a week parameter can be specified which will only retrieve
        a players stats from the specified week. If no week is specified, their
        season totals will be returned.
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
                league_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: leagueKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setLeagueKey, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                The key for the league you'd like to query. League key format:{" "}
                {`{game_key}.l.{league_id}`}
              </div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg, appStyles.required)}>
                player_key
              </div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: playerKeysError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setPlayerKeys, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                Key(s) of the player(s) you'd like to retrieve. Player key
                format: {`{game_key}.p.{player_id}`}. For the purposes of this
                demo, you can enter a comma separated list of player keys for
                the array.
              </div>
            </div>
            <div className={appStyles.row}>
              <div className={cx(appStyles.arg)}>week</div>
              {activeTab === "tester" && (
                <div>
                  <input
                    className={cx(appStyles.value, {
                      [appStyles.inputErr]: leagueKeyError,
                    })}
                    type="text"
                    onChange={(e) => updateInput(setWeek, e.target.value)}
                  ></input>
                </div>
              )}
              <div>
                The week number you'd like the player stats for. If no week is
                provided, the players season totals will be returned.
              </div>
            </div>
          </div>

          {activeTab === "tester" && (
            <div className={appStyles.submit}>
              {(leagueKeyError || playerKeysError) && (
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
  const players = await yf.league.players(
    league_key,
    [player_key(s)],
    week // optional
  );
} catch (e) {
  // handle error
}

// callback based
yf.league.players(
  league_key, 
  [player_key(s)],
  week, // optional
  callbackFn
);`}</CodeBlock>
            </div>

            <div className={appStyles.tester}>
              <h3>Sample Response</h3>
              <CodeBlock>
                {JSON.stringify(
                  {
                    league_key: "388.l.4023",
                    league_id: "4023",
                    name: "Freddy Beach Baseball",
                    url: "https://baseball.fantasysports.yahoo.com/b1/4023",
                    logo_url:
                      "https://ct.yimg.com/cy/8642/28008092841_fff9e0c2d4_192sq.jpg?ct=fantasy",
                    password: "",
                    draft_status: "postdraft",
                    num_teams: 12,
                    edit_key: "2019-09-18",
                    weekly_deadline: "intraday",
                    league_update_timestamp: "1568792177",
                    scoring_type: "head",
                    league_type: "private",
                    renew: "378_2487",
                    renewed: "",
                    iris_group_chat_id: "RWZ3CRIXYRHPXMAVNE4PVZLZNY",
                    short_invitation_url:
                      "https://baseball.fantasysports.yahoo.com/b1/4023/invitation?key=62e534e1574b8306&ikey=37f690ff55b50507",
                    allow_add_to_dl_extra_pos: 1,
                    is_pro_league: "0",
                    is_cash_league: "0",
                    current_week: 24,
                    start_week: "1",
                    start_date: "2019-03-20",
                    end_week: "24",
                    end_date: "2019-09-22",
                    game_code: "mlb",
                    season: "2019",
                    players: [
                      {
                        player_key: "388.p.8575",
                        player_id: "8575",
                        name: {
                          full: "Michael Brantley",
                          first: "Michael",
                          last: "Brantley",
                          ascii_first: "Michael",
                          ascii_last: "Brantley",
                        },
                        editorial_player_key: "mlb.p.8575",
                        editorial_team_key: "mlb.t.18",
                        editorial_team_full_name: "Houston Astros",
                        editorial_team_abbr: "Hou",
                        uniform_number: "23",
                        display_position: "OF",
                        headshot: {
                          url:
                            "https://s.yimg.com/iu/api/res/1.2/JPIK98NwOTMuoGBZFDN_iw--~C/YXBwaWQ9eXNwb3J0cztjaD0yMzM2O2NyPTE7Y3c9MTc5MDtkeD04NTc7ZHk9MDtmaT11bGNyb3A7aD02MDtxPTEwMDt3PTQ2/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/03222019/8575.1.png",
                          size: "small",
                        },
                        image_url:
                          "https://s.yimg.com/iu/api/res/1.2/JPIK98NwOTMuoGBZFDN_iw--~C/YXBwaWQ9eXNwb3J0cztjaD0yMzM2O2NyPTE7Y3c9MTc5MDtkeD04NTc7ZHk9MDtmaT11bGNyb3A7aD02MDtxPTEwMDt3PTQ2/https://s.yimg.com/xe/i/us/sp/v/mlb_cutout/players_l/03222019/8575.1.png",
                        is_undroppable: "0",
                        position_type: "B",
                        primary_position: "OF",
                        eligible_positions: ["OF", "Util"],
                        player_stats: {
                          coverage_type: "season",
                          coverage_value: "2019",
                          stats: [
                            { stat_id: "60", value: "175/549" },
                            { stat_id: "7", value: "86" },
                            { stat_id: "12", value: "21" },
                            { stat_id: "13", value: "86" },
                            { stat_id: "16", value: "3" },
                            { stat_id: "3", value: ".319" },
                          ],
                        },
                        player_advanced_stats: {
                          coverage_type: "season",
                          coverage_value: "2019",
                          stats: [
                            { stat_id: "1035", value: "15.1" },
                            { stat_id: "1008", value: "1.6" },
                            { stat_id: "1013", value: ".329" },
                            { stat_id: "1002", value: ".193" },
                            { stat_id: "1001", value: "88.3" },
                            { stat_id: "1014", value: ".373" },
                            { stat_id: "1015", value: "27.5" },
                            { stat_id: "1011", value: "100" },
                            { stat_id: "1005", value: "230" },
                            { stat_id: "1006", value: "225" },
                            { stat_id: "1009", value: "46.2" },
                            { stat_id: "1007", value: "139" },
                            { stat_id: "1010", value: "28.5" },
                            { stat_id: "1016", value: "136" },
                            { stat_id: "1004", value: "3.64" },
                            { stat_id: "1039", value: "60.0" },
                            { stat_id: "1012", value: ".129" },
                            { stat_id: "1003", value: "18" },
                            { stat_id: "1017", value: "-5.64" },
                            { stat_id: "1040", value: "2.8" },
                            { stat_id: "1041", value: "0.0" },
                            { stat_id: "1042", value: "1.90" },
                          ],
                        },
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

export default LeaguePlayers;
